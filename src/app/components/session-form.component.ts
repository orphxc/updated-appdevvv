import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Add Study Session</h2>

    <input [(ngModel)]="subject" placeholder="Subject"><br>
    <input [(ngModel)]="duration" type="number" placeholder="Duration (mins)"><br>
    <input [(ngModel)]="notes" placeholder="Notes"><br>

    <button (click)="save()">Save</button>
  `
})
export class SessionFormComponent {
  subject = '';
  duration = 0;
  notes = '';

  constructor(private service: SessionService) {}

  save() {
    this.service.addSession({
      subject: this.subject,
      duration: this.duration,
      notes: this.notes
    }).subscribe(() => {
      alert('Session saved!');
      this.subject = '';
      this.duration = 0;
      this.notes = '';
    });
  }
}