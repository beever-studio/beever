import { Injectable, signal } from '@angular/core';
import { ScreenRecorderStatus } from '../models/screen-recorder-status.enum';
import { getSupportedMimeTypes } from '../../shared/utils/mime-type.util';
import { downloadRecording } from '../../shared/utils/download-recording.util';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecorderService {
  mediaRecorder = signal<MediaRecorder | undefined>(undefined);
  recordedBlobs = signal<Blob[]>([]);
  status = signal(ScreenRecorderStatus.INACTIVE);

  isRecording$ = toObservable(this.status).pipe(
    map((status) => status === ScreenRecorderStatus.RECORDING)
  );

  isStopped$ = toObservable(this.status).pipe(
    map((status) => status === ScreenRecorderStatus.STOPPED)
  );

  start(): void {
    this.recordedBlobs.set([]);
    const options = { mimeType: getSupportedMimeTypes()[0] };
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

  stop(): void {
    if (this.mediaRecorder()) {
      this.mediaRecorder()?.stop();
      this.status.set(ScreenRecorderStatus.STOPPED);
    }
  }

  download(): void {
    downloadRecording(this.recordedBlobs());
  }
}
