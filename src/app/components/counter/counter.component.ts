import { Component } from '@angular/core';
import { Counter } from 'src/app/interfaces/counter.interface';
import { FormBuilder } from '@angular/forms';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  public counter: Counter = {
    value: 0,
    count: false,
    countUp: true,
    setTo: 0,
    speed: 1000,
    step: 1
  };

  intervalTimer = interval(1500);
  private _pause$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) { }


  startCounter() {
    this.intervalTimer
      .pipe(
        takeUntil(this._pause$)
      )
      .subscribe(() => {
        if (!this.counter.count) {
          this.counter.value = this.counter.setTo
        }
        this.counter.count = true;
        this.counter.countUp ? this.counter.value += this.counter.step : this.counter.value -= this.counter.step
      })
  }


  pauseCounter() {
    this._pause$.next(false)
  }


  resetCounter() {
    this.counter.value = 0;
    this.counter.step = 1;
    this.counter.setTo = 0;
    this.counter.count = false
  }


  startCountUp() {
    this.counter.countUp = true;
    this.startCounter();
  }
  
  
  startCountDown() {
    this.counter.countUp = false;
    this.startCounter();
  }


}
