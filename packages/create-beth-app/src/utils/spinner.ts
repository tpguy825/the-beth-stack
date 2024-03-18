import cliSpinners from 'cli-spinners';
import readline from 'readline';

export class Spinner {
  private spinner = cliSpinners.dots;
  private idx = 0;
  private timer: NodeJS.Timeout | null = null;

  start(msg: string = '') {
    process.stdout.write(msg);
    this.timer = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${msg} ${this.spinner.frames[this.idx]}`);
      this.idx = (this.idx + 1) % this.spinner.frames.length;
    }, this.spinner.interval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
    }
  }
}
