import { Injectable, signal } from '@angular/core';
import { defer, filter, map, Observable, tap } from 'rxjs';
import { ScreenRecorderStatus } from '../models/screen-recorder-status.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { captureSnapshot } from '../../shared/utils/capture-snapshot.util';

@Injectable({
  providedIn: 'root',
})
export class ScreenRecorderService {
  video!: HTMLVideoElement;

  status = signal(ScreenRecorderStatus.INACTIVE);

  isInactive$ = toObservable(this.status).pipe(
    filter((status) => status === ScreenRecorderStatus.INACTIVE)
  );

  isActive$ = toObservable(this.status).pipe(
    map((status) => {
      const statuses = [
        ScreenRecorderStatus.INACTIVE,
        ScreenRecorderStatus.SELECTING,
      ];
      return !statuses.includes(status);
    })
  );

  public getStream(): Observable<MediaStream> {
    this.status.set(ScreenRecorderStatus.SELECTING);
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
    this.status.set(ScreenRecorderStatus.INACTIVE);
  }

  public captureSnapshot(): void {
    captureSnapshot(this.video);
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
