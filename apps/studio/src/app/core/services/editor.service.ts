import { inject, Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Layout } from '../models/layout.model';
import { PreviewService } from './preview.service';
import { RecorderService } from './recorder.service';
import { combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  sessionService = inject(SessionService);
  previewService = inject(PreviewService);
  recorderService = inject(RecorderService);

  // TODO review Signals/toObservable exposure
  assets = this.sessionService.assets;
  color = this.sessionService.color;
  activeLayout = this.previewService.layout;

  snapshots$ = this.previewService.snapshots$;
  snapshotCount$ = this.snapshots$.pipe(map((snapshots) => snapshots.length));

  initPreview(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
    this.previewService.init(video, canvas, this.sessionService.assets());
    combineLatest([
      this.sessionService.assets$,
      this.previewService.camera$,
      this.previewService.layout$,
    ]).subscribe(([assets, camera, layout]) => {
      // TODO move the subscription in the component
      this.previewService.render(assets, camera, layout);
    });
  }

  setLayout(layout: Layout): void {
    this.previewService.setLayout(layout);
  }

  setBanner(banner: string | null): void {
    this.sessionService.setBanner(banner);
  }

  setLogo(logo: string | null): void {
    this.sessionService.setLogo(logo);
  }

  setBackground(url: string | null): void {
    this.sessionService.setBackground(url);
  }

  setColor(color: string): void {
    this.sessionService.setColor(color);
  }

  deleteSnapshot(index: number) {
    this.previewService.deleteSnapshot(index);
  }

  startRecording(): void {
    this.recorderService.start();
  }

  stopRecording(): void {
    this.recorderService.stop();
  }

  downloadRecording(): void {
    this.recorderService.download();
  }

  showCamera(camera: HTMLVideoElement | undefined): void {
    this.previewService.showCamera(camera);
  }

  shareScreen(): void {
    this.previewService.shareScreen();
  }
}
