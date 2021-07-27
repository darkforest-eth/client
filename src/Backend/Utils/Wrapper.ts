/**
 * React uses referential identity to detect changes, and rerender. Rather
 * than copying an object into a new object, to force a rerender, we can
 * just wrap it in a new {@code Wrapper}, which will force a rerender.
 */
export class Wrapper<T> {
  public readonly value: T;

  public constructor(value: T) {
    this.value = value;
  }

  public or(wrapper: Wrapper<T>) {
    return new Wrapper(this.value || wrapper.value);
  }
}
