import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="timer-box">

      <h2>⏱ Study Timer</h2>

      <!-- BEFORE START -->
      <div *ngIf="!sessionStarted">
        <button (click)="startSession()" class="start-session">
          ▶ Start Study Session
        </button>
      </div>

      <!-- DURING SESSION -->
      <div *ngIf="sessionStarted">

        <h1>{{ formatTime(time) }}</h1>

        <div class="controls">
          <button (click)="start()">Start</button>
          <button (click)="pause()">Pause</button>
          <button (click)="stop()">⏹ Stop & Save</button>
          <button (click)="reset()">Reset</button>
        </div>

      </div>

    </div>
  `
})
export class TimerComponent {

  time = 0;
  interval: any;
  sessionStarted = false;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  // ▶ START SESSION
  startSession() {
    this.sessionStarted = true;
    this.start();
  }

  // ▶ START TIMER
  start() {
    if (!this.interval) {
      this.interval = setInterval(() => this.time++, 1000);
    }
  }

  // ⏸ PAUSE TIMER
  pause() {
    clearInterval(this.interval);
    this.interval = null;
  }

  // ⏹ STOP + SAVE + REDIRECT
  stop() {
    this.pause();

    const session = {
      subject: 'Study Session',
      duration: Math.floor(this.time / 60),
      notes: 'Auto-saved from timer'
    };

    this.sessionService.addSession(session).subscribe(() => {
      this.reset();
      this.sessionStarted = false;

      // 👉 go to session list
      this.router.navigate(['/']);
    });
  }

  // 🔄 RESET
  reset() {
    this.pause();
    this.time = 0;
  }

  // ⏱ FORMAT TIME (MM:SS)
  formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }
}