import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="notes-box" style="background: #1e1e2f; padding: 20px; border-radius: 15px; color: white;">
      <h3>Study Notes </h3>
      <textarea 
        [(ngModel)]="content" 
        placeholder="Type your detailed study notes here..."
        style="width: 100%; height: 200px; border-radius: 8px; padding: 10px; background: #2f2f4f; color: white; border: 1px solid #444; font-family: inherit;">
      </textarea>
    </div>
  `
})
export class NotesComponent {
  content: string = '';

  getAndClearNotes(): string {
    const text = this.content;
    this.content = ''; 
    return text;
  }
}
