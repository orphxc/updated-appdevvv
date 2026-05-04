import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Study Sessions</h2>

    <div *ngFor="let s of sessions" class="session-card">
      
      <div *ngIf="!s.isEditing">
        <strong>{{ s.subject }}</strong>
        <p>⏱ Duration: {{ s.duration }} mins</p>
        <p> Notes: {{ s.notes }}</p>

        <div class="btn-group">
          <button (click)="startEdit(s)" class="btn-primary btn-sm">Edit</button>
          <button (click)="delete(s._id!)" class="btn-danger btn-sm">Delete</button>
        </div>
      </div>

      <div *ngIf="s.isEditing" style="display: flex; flex-direction: column; gap: 8px;">
        <input [(ngModel)]="s.subject" placeholder="Subject">
        <textarea [(ngModel)]="s.notes" placeholder="Notes" style="height: 80px;"></textarea>
        
        <div class="btn-group">
          <button (click)="saveEdit(s)" class="btn-success">Save</button>
          <button (click)="s.isEditing = false" class="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  `
})
export class SessionListComponent implements OnInit {
  sessions: any[] = [];
  constructor(private service: SessionService) {}

  ngOnInit() { this.loadSessions(); }

  loadSessions() {
    this.service.getSessions().subscribe((data: any) => {
      this.sessions = data.map((session: any) => ({ ...session, isEditing: false }));
    });
  }

  delete(id: string) {
    if(confirm("Delete this record?")) {
      this.service.deleteSession(id).subscribe(() => this.loadSessions());
    }
  }

  startEdit(session: any) { session.isEditing = true; }

  saveEdit(session: any) {
    const updatedData = { subject: session.subject, duration: session.duration, notes: session.notes };
    this.service.updateSession(session._id, updatedData).subscribe(() => {
      session.isEditing = false;
      this.loadSessions();
    });
  }
}
