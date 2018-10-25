const Mic = require('./Mic');
const MicBuffer = require('./MicBuffer');
const AudioKey = require('./AudioKey');
const Promise = require('bluebird');
const Analyser = require('audio-analyser');

// const mic = new Mic();
// const buffer = new MicBuffer(mic, 10);
//buffer.start();

const key = new AudioKey(2);

var analyser = new Analyser({
  // Magnitude diapasone, in dB
  minDecibels: -100,
  maxDecibels: -30,

  // Number of time samples to transform to frequency
  fftSize: 1024,

  // Number of frequencies, twice less than fftSize
  frequencyBinCount: 1024/2,

  // Smoothing, or the priority of the old data over the new data
  smoothingTimeConstant: 0.2,

  // Number of channel to analyse
  channel: 0,

  // Size of time data to buffer
  bufferSize: 44100,

  // Windowing function for fft, https://github.com/scijs/window-functions
  applyWindow: function (sampleNumber, totalSamples) {
  }

  //...pcm-stream params, if required
});

key.record()
  .then((audio) => {
    console.log('key created:', audio);
    let res = analyser.getFloatTimeDomainData(audio[0]);
    res = res.filter(a => a);
    console.log('res', res);
  })