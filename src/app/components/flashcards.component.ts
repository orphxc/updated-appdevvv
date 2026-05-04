import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Flashcard {
  question: string;
  answer: string;
  flipped: boolean;
  editing: boolean;
}

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flashcard-box">

      <h3>Flashcards</h3>

      <!-- INPUTS -->
      <input [(ngModel)]="question" placeholder="Enter question">
      <input [(ngModel)]="answer" placeholder="Enter answer">

      <button class="save-btn" (click)="addCard()">Add Card</button>

      <!-- CARDS -->
      <div *ngFor="let card of cards" class="card">

        <!-- FLIP AREA -->
        <div 
          class="card-inner"
          [class.flipped]="card.flipped"
          (click)="flip(card)"
        >

          <!-- FRONT -->
          <div class="card-front">
            <span *ngIf="!card.editing">{{ card.question }}</span>

            <div *ngIf="card.editing">
              <input [(ngModel)]="card.question">
            </div>
          </div>

          <!-- BACK -->
          <div class="card-back">
            <span *ngIf="!card.editing">{{ card.answer }}</span>

            <div *ngIf="card.editing">
              <input [(ngModel)]="card.answer">
            </div>
          </div>

        </div>

        <!-- DELETE (BOTTOM LEFT) -->
        <button class="delete-btn" (click)="deleteCard(card)">
          Delete
        </button>

        <!-- EDIT (BOTTOM RIGHT) -->
        <button class="edit-btn" (click)="toggleEdit(card)">
          {{ card.editing ? 'Save' : 'Edit' }}
        </button>

      </div>

    </div>
  `
})
export class FlashcardsComponent {

  question = '';
  answer = '';
  cards: Flashcard[] = [];

  addCard() {
    if (!this.question || !this.answer) return;

    this.cards.push({
      question: this.question,
      answer: this.answer,
      flipped: false,
      editing: false
    });

    this.question = '';
    this.answer = '';
  }

  flip(card: Flashcard) {
    if (card.editing) return;
    card.flipped = !card.flipped;
  }

  deleteCard(card: Flashcard) {
    this.cards = this.cards.filter(c => c !== card);
  }

  toggleEdit(card: Flashcard) {
    card.editing = !card.editing;
  }
}