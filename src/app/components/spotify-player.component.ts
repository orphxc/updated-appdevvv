import { Component } from '@angular/core';

@Component({
  selector: 'app-spotify-player',
  standalone: true,
  template: `
    <h3>🎧 Study Music</h3>
    <iframe 
      src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6"
      width="300"
      height="80"
      frameborder="0"
      allow="encrypted-media">
    </iframe>
  `
})
export class SpotifyPlayerComponent {}