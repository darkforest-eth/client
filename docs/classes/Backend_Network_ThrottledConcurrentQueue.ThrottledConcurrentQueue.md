# Class: ThrottledConcurrentQueue

[Backend/Network/ThrottledConcurrentQueue](../modules/Backend_Network_ThrottledConcurrentQueue.md).ThrottledConcurrentQueue

A queue that executes promises with a max throughput, and optionally max
concurrency.

## Table of contents

### Constructors

- [constructor](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#constructor)

### Properties

- [concurrency](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#concurrency)
- [executionTimeout](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#executiontimeout)
- [executionTimestamps](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#executiontimestamps)
- [invocationIntervalMs](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#invocationintervalms)
- [maxConcurrency](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#maxconcurrency)
- [taskQueue](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#taskqueue)

### Methods

- [add](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#add)
- [concurrencyQuotaRemaining](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#concurrencyquotaremaining)
- [deleteOutdatedExecutionTimestamps](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#deleteoutdatedexecutiontimestamps)
- [executeNextTasks](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#executenexttasks)
- [next](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#next)
- [nextPossibleExecution](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#nextpossibleexecution)
- [size](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#size)
- [throttleQuotaRemaining](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#throttlequotaremaining)

## Constructors

### constructor

• **new ThrottledConcurrentQueue**(`maxInvocationsPerIntervalMs`, `invocationIntervalMs`, `maxConcurrency?`)

#### Parameters

| Name                          | Type     |
| :---------------------------- | :------- |
| `maxInvocationsPerIntervalMs` | `number` |
| `invocationIntervalMs`        | `number` |
| `maxConcurrency`              | `number` |

## Properties

### concurrency

• `Private` **concurrency**: `number` = `0`

Amount of tasks being executed right now.

---

### executionTimeout

• `Private` **executionTimeout**: `Timeout`

When we schedule an attempt at executing another task in the future,
we don't want to schedule it more than once. Therefore, we keep track
of this scheduled attempt.

---

### executionTimestamps

• `Private` **executionTimestamps**: `default`<`number`\>

Each time a task is executed, record the start of its execution time.
Execution timestamps are removed when they become outdated. Used for
keeping the amount of executions under the throttle limit.

---

### invocationIntervalMs

• `Private` `Readonly` **invocationIntervalMs**: `number`

The interval during which we only allow a certain maximum amount of tasks
to be executed.

---

### maxConcurrency

• `Private` `Readonly` **maxConcurrency**: `number`

Maximum amount of tasks that can be executing at the same time.

---

### taskQueue

• `Private` **taskQueue**: `QueuedTask`<`unknown`\>[] = `[]`

Queue of tasks to execute. Added to the front, popped off the back.

## Methods

### add

▸ **add**<`T`\>(`generator`): `Promise`<`T`\>

Adds a task to be executed at some point in the future. Returns a promise
that resolves when the task finishes successfully, and rejects when there
is an error.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                  | Description                                             |
| :---------- | :-------------------- | :------------------------------------------------------ |
| `generator` | () => `Promise`<`T`\> | a function that returns a promise representing the task |

#### Returns

`Promise`<`T`\>

---

### concurrencyQuotaRemaining

▸ `Private` **concurrencyQuotaRemaining**(): `number`

At this moment, how many more tasks we could execute without exceeding the
concurrency quota.

#### Returns

`number`

---

### deleteOutdatedExecutionTimestamps

▸ `Private` **deleteOutdatedExecutionTimestamps**(): `void`

Removes all task execution timestamps that are older than [[this.invocationIntervalMs]],
because those invocations have no bearing on whether or not we can execute another task.

#### Returns

`void`

---

### executeNextTasks

▸ `Private` **executeNextTasks**(): `Promise`<`void`\>

Runs tasks until it's at either the throttle or concurrency limit. If there are more
tasks to be executed after that, schedules itself to execute again at the soonest
possible moment.

#### Returns

`Promise`<`void`\>

---

### next

▸ `Private` **next**(): `Promise`<`void`\>

If there is a next task to execute, executes it. Records the time of execution in
[executionTimestamps](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md#executiontimestamps). Increments and decrements concurrency counter. Neither throttles
nor limits concurrency.

#### Returns

`Promise`<`void`\>

---

### nextPossibleExecution

▸ `Private` **nextPossibleExecution**(): `undefined` \| `number`

Returns the soonest possible time from now we could execute another task without going
over the throttle limit.

#### Returns

`undefined` \| `number`

---

### size

▸ **size**(): `number`

Returns the amount of queued items, not including the ones that are being executed at this moment.

#### Returns

`number`

---

### throttleQuotaRemaining

▸ `Private` **throttleQuotaRemaining**(): `number`

At this moment, how many more tasks we could execute without exceeding the
throttle quota.

#### Returns

`number`
