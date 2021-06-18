import CircularBuffer from 'mnemonist/circular-buffer';
import { deferred } from '../Utils/Utils';

interface QueuedTask<T> {
  resolve: (t: T) => void;
  reject: (e?: Error) => void;
  generator: () => Promise<T>;
}

/**
 * A queue that executes promises with a max throughput, and optionally max
 * concurrency.
 */
export class ThrottledConcurrentQueue {
  /**
   * The interval during which we only allow a certain maximum amount of tasks
   * to be executed.
   */
  private readonly invocationIntervalMs: number;

  /**
   * Maximum amount of tasks that can be executing at the same time.
   */
  private readonly maxConcurrency: number;

  /**
   * Queue of tasks to execute. Added to the front, popped off the back.
   */
  private taskQueue: Array<QueuedTask<unknown>> = [];

  /**
   * Each time a task is executed, record the start of its execution time.
   * Execution timestamps are removed when they become outdated. Used for
   * keeping the amount of executions under the throttle limit.
   */
  private executionTimestamps: CircularBuffer<number>;

  /**
   * Amount of tasks being executed right now.
   */
  private concurrency = 0;

  /**
   * When we schedule an attempt at executing another task in the future,
   * we don't want to schedule it more than once. Therefore, we keep track
   * of this scheduled attempt.
   */
  private executionTimeout: ReturnType<typeof setTimeout>;

  public constructor(
    maxInvocationsPerIntervalMs: number,
    invocationIntervalMs: number,
    maxConcurrency = Number.POSITIVE_INFINITY
  ) {
    if (maxInvocationsPerIntervalMs <= 0) {
      throw new Error('must allow at least one invocation per interval');
    }

    if (invocationIntervalMs <= 0) {
      throw new Error('invocation interval must be positive');
    }

    if (maxConcurrency <= 0) {
      throw new Error('max concurrency must be positive');
    }

    this.invocationIntervalMs = invocationIntervalMs;
    this.maxConcurrency = maxConcurrency;
    this.executionTimestamps = new CircularBuffer(Array, maxInvocationsPerIntervalMs);
  }

  /**
   * Adds a task to be executed at some point in the future. Returns a promise
   * that resolves when the task finishes successfully, and rejects when there
   * is an error.
   *
   * @param generator a function that returns a promise representing the task
   */
  public add<T>(generator: () => Promise<T>): Promise<T> {
    const [resolve, reject, promise] = deferred<T>();

    this.taskQueue.unshift({
      resolve,
      reject,
      generator,
    });

    setTimeout(() => {
      this.executeNextTasks();
    }, 0);

    return promise;
  }

  /**
   * Returns the amount of queued items, not including the ones that are being executed at this moment.
   */
  public size() {
    return this.taskQueue.length;
  }

  /**
   * Runs tasks until it's at either the throttle or concurrency limit. If there are more
   * tasks to be executed after that, schedules itself to execute again at the soonest
   * possible moment.
   */
  private async executeNextTasks(): Promise<void> {
    this.deleteOutdatedExecutionTimestamps();

    const tasksToExecute = Math.min(
      this.throttleQuotaRemaining(),
      this.concurrencyQuotaRemaining(),
      this.taskQueue.length
    );

    for (let i = 0; i < tasksToExecute; i++) {
      this.next().then(this.executeNextTasks.bind(this));
    }

    const nextPossibleExecution = this.nextPossibleExecution();

    if (this.taskQueue.length > 0 && nextPossibleExecution) {
      clearTimeout(this.executionTimeout);
      this.executionTimeout = setTimeout(this.executeNextTasks.bind(this), nextPossibleExecution);
    }
  }

  /**
   * Returns the soonest possible time from now we could execute another task without going
   * over the throttle limit.
   */
  private nextPossibleExecution(): number | undefined {
    const oldestExecution = this.executionTimestamps.peekFirst();

    if (!oldestExecution || this.concurrencyQuotaRemaining() === 0) {
      return undefined;
    }

    return Date.now() - oldestExecution + this.invocationIntervalMs;
  }

  /**
   * At this moment, how many more tasks we could execute without exceeding the
   * concurrency quota.
   */
  private concurrencyQuotaRemaining(): number {
    return this.maxConcurrency - this.concurrency;
  }

  /**
   * At this moment, how many more tasks we could execute without exceeding the
   * throttle quota.
   */
  private throttleQuotaRemaining(): number {
    return this.executionTimestamps.capacity - this.executionTimestamps.size;
  }

  /**
   * Removes all task execution timestamps that are older than [[this.invocationIntervalMs]],
   * because those invocations have no bearing on whether or not we can execute another task.
   */
  private deleteOutdatedExecutionTimestamps() {
    const now = Date.now();

    let oldestInvocation = this.executionTimestamps.peekFirst();

    while (oldestInvocation && oldestInvocation < now - this.invocationIntervalMs) {
      this.executionTimestamps.shift();
      oldestInvocation = this.executionTimestamps.peekFirst();
    }
  }

  /**
   * If there is a next task to execute, executes it. Records the time of execution in
   * [[executionTimestamps]]. Increments and decrements concurrency counter. Neither throttles
   * nor limits concurrency.
   */
  private async next(): Promise<void> {
    const task = this.taskQueue.pop();

    if (!task) {
      return;
    }

    this.executionTimestamps.push(Date.now());
    this.concurrency++;

    try {
      task.resolve(await task.generator());
    } catch (e) {
      task.reject(e);
    }

    this.concurrency--;
  }
}
