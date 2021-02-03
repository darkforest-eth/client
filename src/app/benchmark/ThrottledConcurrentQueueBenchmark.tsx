import React from 'react';
import { ThrottledConcurrentQueue } from '../../utils/ThrottledConcurrentQueue';
import { sleep } from '../../utils/Utils';

export class ThrottledConcurrentQueueBenchmark extends React.Component {
  finished = 0;
  tasksExecutedRef = React.createRef<HTMLSpanElement>();
  tasksToExecuteRef = React.createRef<HTMLSpanElement>();
  queue = new ThrottledConcurrentQueue(200, 1000);

  start = () => {
    const tasksToAdd = 50000;

    for (let i = 0; i < tasksToAdd; i++) {
      this.queue.add(async () => {
        await sleep(Math.random() * 5000);
        if (this.tasksExecutedRef.current) {
          this.tasksExecutedRef.current.innerText = ++this.finished + '';
        }
      });
    }

    alert('all tasks added');

    if (this.tasksToExecuteRef.current) {
      this.tasksToExecuteRef.current.innerText = tasksToAdd + '';
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.start}>start</button>
        <br />
        total finished: <span ref={this.tasksExecutedRef}></span>
        {' / '}
        <span ref={this.tasksToExecuteRef}></span>
      </div>
    );
  }
}
