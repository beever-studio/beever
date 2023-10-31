import { getSupportedMimeTypes } from './mime-type.util';

export function downloadRecording(blobs: Blob[]): void {
  const blob = new Blob(blobs, {
    type: getSupportedMimeTypes()[0].split(';')[0],
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
