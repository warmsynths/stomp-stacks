import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { StompStore } from './store.js';

/** Wires a StompStore's 'change' events to a Lit host's requestUpdate. */
export class StoreController implements ReactiveController {
  private host: ReactiveControllerHost;
  store: StompStore;

  constructor(host: ReactiveControllerHost, store: StompStore) {
    this.host = host;
    this.store = store;
    host.addController(this);
  }

  private onChange = () => this.host.requestUpdate();

  hostConnected() {
    this.store.addEventListener('change', this.onChange);
  }

  hostDisconnected() {
    this.store.removeEventListener('change', this.onChange);
  }
}
