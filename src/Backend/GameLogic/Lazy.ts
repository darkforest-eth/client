export class Lazy<T> {
  private getPromise: () => Promise<T>;
  private promise: Promise<T> | undefined;

  public constructor(getPromise: () => Promise<T>) {
    this.getPromise = getPromise;
  }

  public get() {
    if (this.promise === undefined) {
      this.promise = this.getPromise();
    }

    return this.promise;
  }
}

export function lazy<T>(getPromise: () => Promise<T>) {
  return new Lazy(getPromise);
}
