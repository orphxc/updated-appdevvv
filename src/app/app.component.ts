import { Component } from '@angular/core';
import { TimerComponent } from './components/timer.component';
import { SpotifyPlayerComponent } from './components/spotify-player.component';
import { NotesComponent } from './components/notes/notes.component';
import { SessionListComponent } from './components/session-list.component';
import { FlashcardsComponent } from './components/flashcards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TimerComponent,
    SpotifyPlayerComponent,
    NotesComponent,
    SessionListComponent,
    FlashcardsComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {}
