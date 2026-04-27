import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>📋 Study Sessions</h2>

    <div *ngFor="let s of sessions" class="session-card">

      <strong>{{ s.subject }}</strong>

      <p>⏱ Duration: {{ s.duration }} mins</p>
      <p>📝 Notes: {{ s.notes }}</p>

      <button (click)="delete(s._id!)" class="delete-btn">
        Delete
      </button>

    </div>
  `
})
export class SessionListComponent implements OnInit {

  sessions: any[] = [];

  constructor(private service: SessionService) {}

  ngOnInit() {
    this.loadSessions();
  }

  // 📥 GET ALL SESSIONS
  loadSessions() {
    this.service.getSessions().subscribe((data: any) => {
      this.sessions = data;
    });
  }

  // ❌ DELETE SESSION
  delete(id: string) {
    this.service.deleteSession(id).subscribe(() => {
      this.loadSessions();
    });
  }
}