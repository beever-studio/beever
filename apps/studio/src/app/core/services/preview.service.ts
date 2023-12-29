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
import { getMediaStream } from '../utils/media.util';

@Injectable({
  providedIn: 'root',
})
export class PreviewService {
  screenShareSrc = signal<HTMLVideoElement | undefined>(undefined);
  screenShare$ = toObservable(this.screenShareSrc);

  screenShareRatio = signal<number>(0.5625);
  screenShareRatio$ = toObservable(this.screenShareRatio);

  canvasSrc = signal<HTMLCanvasElement | undefined>(undefined);

  camera = signal<HTMLVideoElement | undefined>(undefined);
  camera$ = toObservable(this.camera);

  snapshots = signal<string[]>([]);
  snapshots$ = toObservable(this.snapshots);

  layout = signal<Layout>(Layout.PICTURE_IN_PICTURE);
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

    this.render(assets, undefined, Layout.FULL, this.screenShareRatio());
  }

  private setSources(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
    this.screenShareSrc.set(video);
    this.canvasSrc.set(canvas);
  }

  private resetStream(): void {
    const tracks = window.stream?.getTracks();
    tracks?.forEach((track) => track.stop());

    this.screenShareSrc()!.srcObject = null;
  }

  private captureStream(): void {
    window.stream = this.canvasSrc()!.captureStream();
  }

  render(
    assets: Assets,
    camera: HTMLVideoElement | undefined,
    layout: Layout,
    ratio: number
  ): void {
    const context = this.canvasSrc()!.getContext('2d')!;

    if (assets.background) {
      fillBackground(context, assets.background.src);
    } else {
      clearCanvas(context);
    }

    if (this.screenShareSrc()!.srcObject) {
      fillScreen(context, this.screenShareSrc()!, layout, ratio);
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
      this.render(assets, camera, layout, ratio);
    });
  }

  showCamera(activeCamera: HTMLVideoElement | undefined): void {
    this.camera.update((camera) => (camera ? undefined : activeCamera));
  }

  setLayout(layout: Layout): void {
    this.layout.set(layout);
  }

  shareScreen(): void {
    // TODO : do not call render but send an event to the main one
    const width = this.sessionService.format().width;
    const height = this.sessionService.format().height;

    getMediaStream(width, height).subscribe((stream) => {
      const track = stream.getVideoTracks()[0]; // Get the video track
      const settings = track.getSettings(); // Get track settings

      const { width, height } = settings; // Extract width and height

      // @ts-ignore
      const ratio = height / width;

      // calculate how to display any screen in 16:9
      const displayWidth = 854;
      const displayHeight = 480;
      const displayRatio = displayHeight / displayWidth;

      // @ts-ignore
      const displayScale = ratio / displayRatio;
      // @ts-ignore
      const displayWidthScaled = displayWidth * displayScale;
      // @ts-ignore
      const displayHeightScaled = displayHeight * displayScale;
      // @ts-ignore
      const displayXOffset = (displayWidth - displayWidthScaled) / 2;
      // @ts-ignore
      const displayYOffset = (displayHeight - displayHeightScaled) / 2;

      this.screenShareSrc()!.srcObject = stream;
      this.layout.set(Layout.PICTURE_IN_PICTURE);
      this.screenShareRatio.set(ratio);
    });
  }

  public stopPresentation(): void {
    this.resetStream();

    // this.status.set(ScreenRecorderStatus.INACTIVE);
  }

  togglePictureInPicture(): void {
    if (document.pictureInPictureElement) {
      void document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      void this.screenShareSrc()!.requestPictureInPicture();
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
