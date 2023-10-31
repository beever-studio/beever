import { Injectable, signal } from '@angular/core';
import { defer, filter, map, Observable, tap } from 'rxjs';
import { ScreenRecorderStatus } from '../models/screen-recorder-status.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { captureSnapshot } from '../../shared/utils/capture-snapshot.util';
import { getSupportedMimeTypes } from '../../shared/utils/mime-type.util';

@Injectable({
  providedIn: 'root',
})
export class ScreenRecorderService {
  mediaRecorder = signal<MediaRecorder | undefined>(undefined);
  recordedBlobs = signal<Blob[]>([]);
  supportedMimeTypes = getSupportedMimeTypes();

  video!: HTMLVideoElement;

  status = signal(ScreenRecorderStatus.INACTIVE);

  isInactive$ = toObservable(this.status).pipe(
    filter((status) => status === ScreenRecorderStatus.INACTIVE)
  );

  isActive$ = toObservable(this.status).pipe(
    map((status) => {
      const isInactive = status === ScreenRecorderStatus.INACTIVE;
      const unSelectedScreen =
        status === ScreenRecorderStatus.SELECTING && !window.stream;

      return !isInactive && !unSelectedScreen;
    })
  );

  public getStream(): Observable<MediaStream> {
    this.status.set(ScreenRecorderStatus.SELECTING);
    return defer(() => this.getDisplayMedia()).pipe(
      tap({
        next: (stream) => {
          this.resetStream();
          this.initStream(stream);
          this.status.set(ScreenRecorderStatus.SELECTED);
        },
        error: () => this.status.set(ScreenRecorderStatus.INACTIVE),
      })
    );
  }

  public stopPresentation(): void {
    this.resetStream();

    this.status.set(ScreenRecorderStatus.INACTIVE);
  }

  startRecording(): void {
    this.recordedBlobs.set([]);
    const options = { mimeType: this.supportedMimeTypes[0] };
    const recorder = new MediaRecorder(window.stream, options);

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.update((blobs) => [...blobs, event.data]);
      }
    };

    recorder.start();
    this.mediaRecorder.set(recorder);
    this.status.set(ScreenRecorderStatus.RECORDING);
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

  private resetStream(): void {
    const tracks = window.stream?.getTracks();
    tracks?.forEach((track) => track.stop());

    this.video.srcObject = null;
  }
}
