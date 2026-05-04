import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="timer-box">
      <h2>⏱ Study Timer</h2>

      <div *ngIf="!sessionStarted && !showForm">
        <button (click)="openForm()" class="btn-primary">▶ Start Study Session</button>
      </div>

      <div *ngIf="showForm" class="form-card">
        <h3>📚 Enter Session Details</h3>
        <label>Subject</label>
        <input [(ngModel)]="subject" placeholder="Subject">
        <label>User</label>
        <input [(ngModel)]="user" placeholder="Your name">
        <label>Brief Remark</label>
        <input [(ngModel)]="notes" placeholder="Quick topic summary">

        <div class="btn-group">
          <button (click)="startSession()" class="btn-success">Start Timer</button>
          <button (click)="cancel()" class="btn-secondary">Cancel</button>
        </div>
      </div>

      <div *ngIf="sessionStarted" class="timer-view">
        <h1>{{ formatTime(time) }}</h1>
        <div class="controls">
          <button (click)="start()" class="btn-success">Start</button>
          <button (click)="pause()" class="btn-secondary">Pause</button>
          <button (click)="stop()" class="btn-danger">⏹ Stop & Save All</button>
          <button (click)="reset()" class="btn-secondary">Reset</button>
        </div>
      </div>
    </div>
  `
})
export class TimerComponent {
  @Input() notesRef!: NotesComponent;
  time = 0; interval: any; sessionStarted = false; showForm = false;
  subject = ''; user = ''; notes = '';

  constructor(private sessionService: SessionService) {}
  openForm() { this.showForm = true; }
  cancel() { this.showForm = false; }
  startSession() { this.showForm = false; this.sessionStarted = true; this.start(); }
  start() { if (!this.interval) this.interval = setInterval(() => this.time++, 1000); }
  pause() { clearInterval(this.interval); this.interval = null; }
  stop() {
    this.pause();
    const detailedNotes = this.notesRef ? this.notesRef.getAndClearNotes() : '';
    const session = {
      subject: this.subject,
      duration: Math.floor(this.time / 60),
      notes: `User: ${this.user} | Summary: ${this.notes} | Detailed: ${detailedNotes}`
    };
    this.sessionService.addSession(session).subscribe(() => {
      this.reset(); this.sessionStarted = false;
    });
  }
  reset() { this.pause(); this.time = 0; }
  formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }
}
