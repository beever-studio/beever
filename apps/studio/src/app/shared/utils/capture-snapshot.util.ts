export function captureSnapshot(video: HTMLVideoElement): void {
  // create canvas from video
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d')?.drawImage(video, 0, 0);
  const image = canvas.toDataURL('image/png');

  // download image
  const a = document.createElement('a');
  a.href = image;
  a.download = 'snapshot.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
