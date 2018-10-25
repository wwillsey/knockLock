const AudioBuffer = require('audio-buffer')
const util = require('audio-buffer-utils');


class MicBuffer {
  /**
   * @param {Mic} mic
   * @param {*} audioBufferArgs
   */
  constructor(mic, bufferLen,  audioBufferArgs) {
    this.mic = mic;
    this.buffer = util.create(0, audioBufferArgs);
    this.bufferTimeLength = bufferLen;
  }

  addData(data) {
    console.log('adding data: ', data);
    const buf = util.create(data);


    //util.removeStatic(buf);
    //util.normalize(buf)
    console.log('adding buffer: ', buf);

    this.buffer = util.concat(this.buffer, buf);
    console.log('buffer size:', util.size(this.buffer), this.buffer.duration);
    console.log('current buffer; ', this.buffer);
    if (this.buffer.duration > this.bufferTimeLength) {
      this.buffer = util.slice(this.buffer, data.length);
    }
  }

  start() {
    this.mic.start((data) => {
      this.addData(data)
    });
  }
}

module.exports = MicBuffer;