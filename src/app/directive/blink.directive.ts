import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appBlink]'
})
export class BlinkDirective {

  hidden = false;

  elRef: ElementRef;

  @Input('blink-trigger') set trigger(condition: boolean) {
    if (!condition) {
      this.stop();
    } else {
      this.blink();
    }
  }

  interval: any;

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  blink() {
    this.interval = setInterval(() => {
      this.elRef.nativeElement.hidden = (this.hidden = !this.hidden);
    }, 500);
  }

  stop() {
    this.hidden = false;
    this.elRef.nativeElement.hidden = false;
    clearInterval(this.interval);
  }

}
