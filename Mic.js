var mic = require('mic');

class Mic {
    constructor(args, output) {
        this.micInstance = mic({
            rate: '16000',
            channels: '1',
            debug: true,
            exitOnSilence: 0,
            ...args
        });

        this.micInputStream = this.micInstance.getAudioStream();

        if (output) {
            this.micInputStream.pipe(output)
        }
    }

    start(dataFn) {
        this.micInputStream.on('data', dataFn);
        this.micInstance.start();
    }
}

module.exports = Mic;
