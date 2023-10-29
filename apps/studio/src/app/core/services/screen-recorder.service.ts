import { Injectable } from '@angular/core';
import { defer, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenRecorderService {
  video!: HTMLVideoElement;

  public getStream(video: HTMLVideoElement): Observable<MediaStream> {
    this.video = video;
    return defer(() => this.getDisplayMedia()).pipe(
      tap((stream) => this.initStream(stream))
    );
  }

  private getDisplayMedia(): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1280,
        height: 720,
        displaySurface: 'default',
      },
    });
  }

  private initStream(stream: MediaStream): void {
    window.stream = stream;
    this.video.srcObject = stream;
  }
}
