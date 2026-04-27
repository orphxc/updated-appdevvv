import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>📝 Study Notes</h2>

    <textarea 
      [(ngModel)]="notes" 
      placeholder="Write your notes while studying..."
    ></textarea>

    <div class="notes-actions">
      <button (click)="clear()">Clear</button>
      <button (click)="save()">Save</button>
    </div>

    <p *ngIf="savedMessage" class="saved-msg">
      ✔ Notes saved locally!
    </p>
  `
})
export class NotesComponent {

  notes = '';
  savedMessage = false;

  ngOnInit() {
    const saved = localStorage.getItem('study-notes');
    if (saved) this.notes = saved;
  }

  save() {
    localStorage.setItem('study-notes', this.notes);
    this.savedMessage = true;

    setTimeout(() => this.savedMessage = false, 2000);
  }

  clear() {
    this.notes = '';
    localStorage.removeItem('study-notes');
  }
}