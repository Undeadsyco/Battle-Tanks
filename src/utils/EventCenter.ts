let emitter: Phaser.Events.EventEmitter|null = null;

export default class EventCenter {
  static {
    emitter = new Phaser.Events.EventEmitter;
  }

  static get emitter(): Phaser.Events.EventEmitter {
    if (!emitter) emitter = new Phaser.Events.EventEmitter;
    return emitter;
  }
}