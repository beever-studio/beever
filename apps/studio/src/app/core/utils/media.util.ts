import { defer, Observable } from 'rxjs';

export function getMediaStream(
  width: number,
  height: number
): Observable<MediaStream> {
  return defer(() => getDisplayMedia());
}

export function getDisplayMedia(): Promise<MediaStream> {
  return navigator.mediaDevices.getDisplayMedia({
    video: true,
  });
}
