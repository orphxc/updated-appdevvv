import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="timer-box">

      <h2>⏱ Study Timer</h2>

      <!-- START BUTTON -->
      <div *ngIf="!sessionStarted && !showForm">
        <button (click)="openForm()" class="start-session">
          ▶ Start Study Session
        </button>
      </div>

      <!-- MODERN FORM -->
      <div *ngIf="showForm" class="form-card">

        <h3>📚 Enter Session Details</h3>

        <label>Subject</label>
        <input [(ngModel)]="subject" placeholder="Subject">

        <label>User</label> <!-- 👈 CHANGED -->
        <input [(ngModel)]="user" placeholder="Your name">

        <label>Notes</label>
        <input [(ngModel)]="notes" placeholder="Notes">

        <div class="btn-group">
          <button (click)="startSession()">Start Timer</button>
          <button (click)="cancel()" class="cancel">Cancel</button>
        </div>

      </div>

      <!-- TIMER VIEW -->
      <div *ngIf="sessionStarted" class="timer-view">

        <h1>{{ formatTime(time) }}</h1>

        <div class="controls">
          <button (click)="start()">Start</button>
          <button (click)="pause()">Pause</button>
          <button (click)="stop()">⏹ Stop & Save</button>
          <button (click)="reset()">Reset</button>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .form-card {
      background: #2f2f4f;
      padding: 20px;
      border-radius: 15px;
      margin-top: 15px;
    }

    label {
      display: block;
      margin-top: 10px;
      color: white;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 8px;
      border: none;
    }

    .btn-group {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px 15px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      background: #00cfe8;
      color: black;
      font-weight: bold;
    }

    .cancel {
      background: gray;
      color: white;
    }

    .timer-view {
      margin-top: 20px;
      text-align: center;
    }
  `]
})
export class TimerComponent {

  time = 0;
  interval: any;
  sessionStarted = false;
  showForm = false;

  subject = '';
  user = ''; // 👈 NEW FIELD
  notes = '';

  constructor(private sessionService: SessionService) {}

  openForm() {
    this.showForm = true;
  }

  startSession() {
    if (!this.subject || !this.user) {
      alert('Fill all required fields');
      return;
    }

    this.showForm = false;
    this.sessionStarted = true;
    this.start();
  }

  cancel() {
    this.showForm = false;
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(() => this.time++, 1000);
    }
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
  }

  stop() {
    this.pause();

    const session = {
      subject: this.subject,
      duration: Math.floor(this.time / 60),
      notes: `${this.user} - ${this.notes}` // 👈 includes user
    };

    this.sessionService.addSession(session).subscribe(() => {
      alert('Session saved!');
      this.reset();
      this.sessionStarted = false;
      this.subject = '';
      this.user = '';
      this.notes = '';
    });
  }

  reset() {
    this.pause();
    this.time = 0;
  }

  formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }
}