const util = require('audio-buffer-utils');
const Mic = require('./Mic');
const fs = require('fs');
const MicBuffer = require('./MicBuffer');
const Promise = require('bluebird');

class AudioKey {
  constructor(duration, outFileName) {
    this.duration = duration + .5;
    const output = outFileName ? fs.WriteStream(outFileName) : undefined;
    this.mic = new Mic(undefined, output);
    this.micBuffer = new MicBuffer(this.mic, this.duration);
  }

  record() {
    return new Promise((res, rej) => {
      console.log(`prepare to record for ${this.duration} seconds`);
      setTimeout(() => {console.log(3)}, 1000);
      setTimeout(() => {console.log(2)}, 2000);
      setTimeout(() => {console.log(1)}, 3000);
      setTimeout(() => {
        console.log('recording!');
        this.micBuffer.start();
        setTimeout(() => {
          console.log('done!');
          this.mic.micInstance.pause();
          const key = this.createKey();
          res(key);
        }, this.duration * 1000)
      }, 4000);

    });
  }

  createKey() {
    const buf = util.shallow(this.micBuffer.buffer);
    // util.removeStatic(buf);
    // util.normalize(buf);
    return util.data(buf);
  }
}

module.exports = AudioKey;