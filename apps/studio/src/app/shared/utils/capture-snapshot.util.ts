export function captureSnapshot(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}
