# Class: ThrottledConcurrentQueue

[Backend/Network/ThrottledConcurrentQueue](../modules/backend_network_throttledconcurrentqueue.md).ThrottledConcurrentQueue

A queue that executes promises with a max throughput, and optionally max
concurrency.

## Table of contents

### Constructors

- [constructor](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#constructor)

### Properties

- [concurrency](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#concurrency)
- [executionTimeout](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#executiontimeout)
- [executionTimestamps](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#executiontimestamps)
- [invocationIntervalMs](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#invocationintervalms)
- [maxConcurrency](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#maxconcurrency)
- [taskQueue](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#taskqueue)

### Methods

- [add](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#add)
- [concurrencyQuotaRemaining](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#concurrencyquotaremaining)
- [deleteOutdatedExecutionTimestamps](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#deleteoutdatedexecutiontimestamps)
- [executeNextTasks](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#executenexttasks)
- [next](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#next)
- [nextPossibleExecution](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#nextpossibleexecution)
- [size](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#size)
- [throttleQuotaRemaining](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#throttlequotaremaining)

## Constructors

### constructor

\+ **new ThrottledConcurrentQueue**(`maxInvocationsPerIntervalMs`: _number_, `invocationIntervalMs`: _number_, `maxConcurrency?`: _number_): [_ThrottledConcurrentQueue_](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md)

#### Parameters

| Name                          | Type     |
| :---------------------------- | :------- |
| `maxInvocationsPerIntervalMs` | _number_ |
| `invocationIntervalMs`        | _number_ |
| `maxConcurrency`              | _number_ |

**Returns:** [_ThrottledConcurrentQueue_](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md)

## Properties

### concurrency

• `Private` **concurrency**: _number_= 0

Amount of tasks being executed right now.

---

### executionTimeout

• `Private` **executionTimeout**: _Timeout_

When we schedule an attempt at executing another task in the future,
we don't want to schedule it more than once. Therefore, we keep track
of this scheduled attempt.

---

### executionTimestamps

• `Private` **executionTimestamps**: _default_<number\>

Each time a task is executed, record the start of its execution time.
Execution timestamps are removed when they become outdated. Used for
keeping the amount of executions under the throttle limit.

---

### invocationIntervalMs

• `Private` `Readonly` **invocationIntervalMs**: _number_

The interval during which we only allow a certain maximum amount of tasks
to be executed.

---

### maxConcurrency

• `Private` `Readonly` **maxConcurrency**: _number_

Maximum amount of tasks that can be executing at the same time.

---

### taskQueue

• `Private` **taskQueue**: _QueuedTask_<unknown\>[]= []

Queue of tasks to execute. Added to the front, popped off the back.

## Methods

### add

▸ **add**<T\>(`generator`: () => _Promise_<T\>): _Promise_<T\>

Adds a task to be executed at some point in the future. Returns a promise
that resolves when the task finishes successfully, and rejects when there
is an error.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                | Description                                             |
| :---------- | :------------------ | :------------------------------------------------------ |
| `generator` | () => _Promise_<T\> | a function that returns a promise representing the task |

**Returns:** _Promise_<T\>

---

### concurrencyQuotaRemaining

▸ `Private` **concurrencyQuotaRemaining**(): _number_

At this moment, how many more tasks we could execute without exceeding the
concurrency quota.

**Returns:** _number_

---

### deleteOutdatedExecutionTimestamps

▸ `Private` **deleteOutdatedExecutionTimestamps**(): _void_

Removes all task execution timestamps that are older than [[this.invocationIntervalMs]],
because those invocations have no bearing on whether or not we can execute another task.

**Returns:** _void_

---

### executeNextTasks

▸ `Private` **executeNextTasks**(): _Promise_<void\>

Runs tasks until it's at either the throttle or concurrency limit. If there are more
tasks to be executed after that, schedules itself to execute again at the soonest
possible moment.

**Returns:** _Promise_<void\>

---

### next

▸ `Private` **next**(): _Promise_<void\>

If there is a next task to execute, executes it. Records the time of execution in
[executionTimestamps](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md#executiontimestamps). Increments and decrements concurrency counter. Neither throttles
nor limits concurrency.

**Returns:** _Promise_<void\>

---

### nextPossibleExecution

▸ `Private` **nextPossibleExecution**(): _undefined_ \| _number_

Returns the soonest possible time from now we could execute another task without going
over the throttle limit.

**Returns:** _undefined_ \| _number_

---

### size

▸ **size**(): _number_

Returns the amount of queued items, not including the ones that are being executed at this moment.

**Returns:** _number_

---

### throttleQuotaRemaining

▸ `Private` **throttleQuotaRemaining**(): _number_

At this moment, how many more tasks we could execute without exceeding the
throttle quota.

**Returns:** _number_
