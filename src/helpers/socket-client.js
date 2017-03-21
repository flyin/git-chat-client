import io from 'socket.io-client';
import settings from 'settings';

function _generateId(length = 72) {
  return new Array(length).join().replace(
    /./g,
    () => Math.ceil(Math.random() * 36).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
  );
}

export default class SocketClient {
  subscriptions = {};
  socket = null;

  constructor() {
    this.onSubscribeData = this.onSubscribeData.bind(this);
  }

  connect() {
    this.socket = io(settings.urls.socket);
    this.socket.on('subscribe:data', this.onSubscribeData);
  }

  isConnected() {
    return !!this.socket;
  }

  subscribe({ query, variables }, handler) {
    if (!this.isConnected()) {
      this.connect();
    }

    const subId = _generateId();

    this.socket.emit('subscribe:start', { query, subId, variables }, (message) => {
      if (message.error) {
        this.subscriptions[message.subId].handler([message.errors], null);
        delete this.subscriptions[message.subId];
      }

      this.subscriptions[message.subId] = { handler, query, variables };
    });

    return subId;
  }

  unsubscribe(subId) {
    delete this.subscriptions[subId];
    this.socket.emit('subscribe:stop', { subId });
  }

  onSubscribeData(message) {
    this.subscriptions[message.subId].handler(null, message.payload.data);
  }
}
