export class AnimationManager {
  active = false;

  queue: { event: KeyboardEvent }[] = [];

  onComplete(fn: (event: KeyboardEvent) => void) {
    this.active = false;
    const value = this.queue.shift();
    if (value) {
      fn(value.event);
    }
  }
}
