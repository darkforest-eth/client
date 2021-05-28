/**
 * You can schedule a function to be executed {@code waitThisLong} in the future. If you
 * schedule again, the previously scheduled function will not be executed.
 */
export class BlockWaiter {
  private timeout?: ReturnType<typeof setTimeout>;
  private waitThisLong: number;

  public constructor(waitThisLong: number) {
    this.waitThisLong = waitThisLong;
  }

  public schedule(func: () => void) {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    this.timeout = setTimeout(func, this.waitThisLong);
  }
}
