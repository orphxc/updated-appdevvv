import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TimerComponent } from './components/timer.component';
import { SessionFormComponent } from './components/session-form.component';
import { SpotifyPlayerComponent } from './components/spotify-player.component';
import { NotesComponent } from './components/notes/notes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TimerComponent,
    SessionFormComponent,
    SpotifyPlayerComponent,
    NotesComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {}