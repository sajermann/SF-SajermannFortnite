// src/lib/zlib-sync-polyfill.js
import { inflateSync } from 'fflate';

export class Inflate {
  constructor() {
    this.chunks = [];
  }

  push(chunk) {
    const result = inflateSync(new Uint8Array(chunk));
    this.chunks.push(Buffer.from(result));
  }

  get result() {
    return Buffer.concat(this.chunks);
  }
}
