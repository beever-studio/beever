import { Injectable, signal } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { captureSnapshot } from '../../shared/utils/capture-snapshot.util';
import { SessionService } from './session.service';
import {
  clearCanvas,
  fillBackground,
  fillBanner,
  fillCamera,
  fillLogo,
  fillScreen,
} from '../utils/canvas.util';
import { Assets } from '../models/assets.model';
import { Layout } from '../models/layout.model';

@Injectable({
  providedIn: 'root',
})
export class PreviewService {
  videoSrc = signal<HTMLVideoElement | undefined>(undefined);
  canvasSrc = signal<HTMLCanvasElement | undefined>(undefined);

  camera = signal<HTMLVideoElement | undefined>(undefined);
  camera$ = toObservable(this.camera);

  snapshots = signal<string[]>([]);
  snapshots$ = toObservable(this.snapshots);

  layout = signal<Layout>(Layout.FULL);
  layout$ = toObservable(this.layout);

  // TODO move required logic to EditorService
  constructor(private readonly sessionService: SessionService) {}

  public init(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    assets: Assets
  ): void {
    this.setSources(video, canvas);
    this.resetStream();
    this.captureStream();

    this.render(assets, undefined, Layout.FULL);
  }

  private setSources(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
    this.videoSrc.set(video);
    this.canvasSrc.set(canvas);
  }

  private resetStream(): void {
    const tracks = window.stream?.getTracks();
    tracks?.forEach((track) => track.stop());

    this.videoSrc()!.srcObject = null;
  }

  private captureStream(): void {
    window.stream = this.canvasSrc()!.captureStream();
  }

  render(
    assets: Assets,
    camera: HTMLVideoElement | undefined,
    layout: Layout
  ): void {
    const context = this.canvasSrc()!.getContext('2d')!;

    if (assets.background) {
      fillBackground(context, assets.background.src);
    } else {
      clearCanvas(context);
    }

    if (this.videoSrc()!.srcObject) {
      fillScreen(context, this.videoSrc()!, layout);
      // TODO : test
      // this.videoSrc()!.srcObject.getVideoTracks().forEach(track => track.requestFrame());
    }

    if (camera) {
      fillCamera(context, camera, layout);
    }

    // TODO : set an option to set a custom background color

    if (assets.logo) {
      fillLogo(context, assets.logo.src);
    }

    if (assets.banner) {
      fillBanner(context, assets.banner, assets.color);
    }

    window.requestAnimationFrame(() => {
      this.render(assets, camera, layout);
    });
  }

  showCamera(activeCamera: HTMLVideoElement | undefined): void {
    this.camera.update((camera) => (camera ? undefined : activeCamera));
  }

  setLayout(layout: Layout): void {
    this.layout.set(layout);
  }

  shareScreen(): void {
    this.getMediaStream().subscribe((stream) => {
      this.videoSrc()!.srcObject = stream;
      this.render(this.sessionService.assets(), undefined, Layout.FULL);
    });
  }

  public stopPresentation(): void {
    this.resetStream();

    // this.status.set(ScreenRecorderStatus.INACTIVE);
  }

  private getMediaStream(): Observable<MediaStream> {
    return defer(() => this.getDisplayMedia());
  }

  private getDisplayMedia(): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({
      video: {
        width: this.sessionService.format().width,
        height: this.sessionService.format().height,
        displaySurface: 'default',
      },
    });
  }

  togglePictureInPicture(): void {
    if (document.pictureInPictureElement) {
      void document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      void this.videoSrc()!.requestPictureInPicture();
    }
  }

  public captureSnapshot(): void {
    const snapshot = captureSnapshot(this.canvasSrc()!);
    this.snapshots.update((snapshots) => [...snapshots, snapshot]);
  }

  public deleteSnapshot(index: number): void {
    this.snapshots.update((snapshots) =>
      snapshots.filter((_, i) => i !== index)
    );
  }
}
