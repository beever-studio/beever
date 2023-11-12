import { Injectable, signal } from '@angular/core';
import { combineLatest, defer, filter, map, Observable, take, tap } from 'rxjs';
import { ScreenRecorderStatus } from '../models/screen-recorder-status.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { captureSnapshot } from '../../shared/utils/capture-snapshot.util';
import { getSupportedMimeTypes } from '../../shared/utils/mime-type.util';
import { downloadRecording } from '../../shared/utils/download-recording.util';
import { imageLoader } from '../../shared/utils/image-loader.util';
import { htmlLoader } from '../../shared/utils/html-loader.util';

@Injectable({
  providedIn: 'root',
})
export class ScreenRecorderService {
  mediaRecorder = signal<MediaRecorder | undefined>(undefined);
  recordedBlobs = signal<Blob[]>([]);
  snapshots = signal<string[]>([]);
  status = signal(ScreenRecorderStatus.INACTIVE);

  /* overlays */
  logo = signal<HTMLImageElement | null>(null);
  banner = signal<HTMLImageElement | null>(null);
  background = signal<HTMLImageElement | undefined>(undefined);

  assets$ = combineLatest([
    toObservable(this.logo),
    toObservable(this.banner),
    toObservable(this.background),
  ]);

  supportedMimeTypes = getSupportedMimeTypes();

  video!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;

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

  isRecording$ = toObservable(this.status).pipe(
    map((status) => status === ScreenRecorderStatus.RECORDING)
  );

  isStopped$ = toObservable(this.status).pipe(
    map((status) => status === ScreenRecorderStatus.STOPPED)
  );

  snapshots$ = toObservable(this.snapshots);

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

  stopRecording(): void {
    if (this.mediaRecorder()) {
      this.mediaRecorder()?.stop();
      this.status.set(ScreenRecorderStatus.STOPPED);
    }
  }

  download(): void {
    downloadRecording(this.recordedBlobs());
  }

  togglePictureInPicture(): void {
    if (document.pictureInPictureElement) {
      void document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      void this.video.requestPictureInPicture();
    }
  }

  public captureSnapshot(): void {
    const snapshot = captureSnapshot(this.canvas);
    this.snapshots.update((snapshots) => [...snapshots, snapshot]);
  }

  public deleteSnapshot(index: number): void {
    this.snapshots.update((snapshots) =>
      snapshots.filter((_, i) => i !== index)
    );
  }

  public setLogo(logo: string | null): void {
    if (!logo) {
      this.logo.set(null);
      return;
    }

    imageLoader(logo)
      .pipe(take(1))
      .subscribe((image) => {
        this.logo.set(image);
        this.renderCanvas();
      });
  }

  public setBanner(banner: string | null): void {
    if (!banner) {
      this.banner.set(null);
      return;
    }

    htmlLoader(banner)
      .pipe(take(1))
      .subscribe((image) => {
        this.banner.set(image);
        this.renderCanvas();
      });
  }

  public setBackground(url: string | undefined): void {
    if (!url) {
      this.background.set(undefined);
      return;
    }

    imageLoader(url)
      .pipe(take(1))
      .subscribe((image) => {
        this.background.set(image);
        this.renderCanvas();
      });
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
    window.stream = this.canvas.captureStream();
    this.video.srcObject = stream;

    this.renderCanvas();
    window.requestAnimationFrame(this.renderCanvas.bind(this));
  }

  renderCanvas(): void {
    const context = this.canvas.getContext('2d');

    if (context) {
      this.assets$.pipe(take(1)).subscribe(([logo, banner, background]) => {
        if (background) {
          context.drawImage(background, 0, 0, 854, 480);
        }

        context.drawImage(this.video, 0, 0, 854, 480);

        if (logo) {
          context.drawImage(logo, 764, 10, 80, 80);
        }

        if (banner) {
          console.log('banner', banner);
          context.drawImage(banner, 50, 50, 80, 80);
        }

        window.requestAnimationFrame(this.renderCanvas.bind(this));
      });
    }
  }

  private resetStream(): void {
    const tracks = window.stream?.getTracks();
    tracks?.forEach((track) => track.stop());

    this.video.srcObject = null;
  }
}
