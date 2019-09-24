class EventEmittor {
  constructor() {
    this._events = new Set();
    this._callbacks = {};
  }

  on(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
    }

    if (this._events.has(eventName)) {
      if (this._isDuplicateCallback(eventName, callback)) {
        console.warn(`${eventName} has duplicate callback ${callback}`);
      }
    } else {
      this._events.add(eventName);
      this._callbacks[eventName] = [];
    }

    this._addCallBack(eventName, callback);

    return this;
  }

  off(eventName, callback) {
    if (this._events.has(eventName)) {
      if (callback) {
        this._removeCallBack(eventName, callback);
      } else {
        this._events.delete(eventName);
        delete this._callbacks[eventName];
      }
    }

    return this;
  }

  emit(eventName) {
    
  }

  _isDuplicateCallback(eventName, callback) {
    const eventCallbacks = this._callbacks[eventName];
    for (let i = 0; i < eventCallbacks.length; i++) {
      if (eventCallbacks[i] === callback) return false;
    }

    return true;
  }

  _addCallBack(eventName, callback) {
    this._callbacks[eventName].push(callback);
  }

  _removeCallBack(eventName, callback) {
    const newEventCallbacks = [];
    const eventCallbacks = this._callbacks[eventName];

    for (let i = 0; i < eventCallbacks.length; i++) {
      if (eventCallbacks[i] !== callback) newEventCallbacks.push(eventCallbacks[i]);
    }

    this._callbacks[eventName] = newEventCallbacks;
  }
}

export default EventEmittor;