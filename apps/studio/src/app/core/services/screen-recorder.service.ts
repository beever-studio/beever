import { Injectable, signal } from '@angular/core';
import { defer, Observable, tap } from 'rxjs';
import { ScreenRecorderStatus } from '../models/screen-recorder-status.enum';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenRecorderService {
  video!: HTMLVideoElement;

  status = signal(ScreenRecorderStatus.INACTIVE);
  status$ = toObservable(this.status);

  public getStream(video: HTMLVideoElement): Observable<MediaStream> {
    this.status.set(ScreenRecorderStatus.SELECTING);
    this.video = video;
    return defer(() => this.getDisplayMedia()).pipe(
      tap({
        next: (stream) => {
          this.initStream(stream);
          this.status.set(ScreenRecorderStatus.SELECTED);
        },
        error: () => this.status.set(ScreenRecorderStatus.INACTIVE),
      })
    );
  }

  public stopPresentation(): void {
    const tracks = window.stream?.getTracks();
    tracks?.forEach((track) => track.stop());

    this.video.srcObject = null;
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
