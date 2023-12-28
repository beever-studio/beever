import { defer, Observable } from 'rxjs';

export function getMediaStream(
  width: number,
  height: number
): Observable<MediaStream> {
  return defer(() => getDisplayMedia(width, height));
}

export function getDisplayMedia(
  width: number,
  height: number
): Promise<MediaStream> {
  return navigator.mediaDevices.getDisplayMedia({
    video: {
      width: width,
      height: height,
      displaySurface: 'default',
    },
  });
}
