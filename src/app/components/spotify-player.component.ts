import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spotify-player',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="spotify-box">

      <h3>Study Music</h3>

      <input
        [(ngModel)]="playlistUrl"
        placeholder="Paste Spotify playlist link. The playlist must be public"
      >

      <button (click)="loadPlaylist()">Load Playlist</button>

<iframe
  *ngIf="embedUrl"
  [src]="embedUrl"
  width="100%"
  height="380"
  frameborder="0"
  allow="encrypted-media">
</iframe>

    </div>
  `
})
export class SpotifyPlayerComponent {

  playlistUrl = '';
  embedUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  loadPlaylist() {
    if (!this.playlistUrl.includes('spotify.com')) {
      alert('Invalid Spotify link');
      return;
    }

    const embed = this.playlistUrl.replace(
      'open.spotify.com',
      'open.spotify.com/embed'
    );

    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }
}