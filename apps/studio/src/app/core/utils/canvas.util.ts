/*

export function renderCanvas(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  layout: Layout,
  logo: HTMLImageElement | null,
  background: HTMLImageElement | undefined,
  color: string,
  videoSources: VideoSource[],
  banner: string | undefined
): void {

  if (context) {

    if (
      video.srcObject &&
      layout !== Layout.FULL &&
      layout !== Layout.SOLO_LAYOUT
    ) {
      context.drawImage(video, 0, 0, 854, 480);
    }

    const camera = videoSources.find((source) => source.isActive);
    if (camera) {
      // show first camera in right bottom corner
      if (layout === Layout.FULL) {
        context.drawImage(camera.src, 0, 0, 854, 480);
      } else if (layout === Layout.SOLO_LAYOUT) {
        context.drawImage(camera.src, 40, 40, 774, 400);
      } else if (layout === Layout.PICTURE_IN_PICTURE) {
        context.drawImage(camera.src, 684, 380, 160, 90);
      }
      this.cameras.forEach((camera, index) => {
        context.drawImage(camera, 10 + (index * 170), 10, 160, 90);
      });
    }


    window.requestAnimationFrame(function () {
      renderCanvas(context, video, layout, logo, background, color, videoSources, banner);
    });
  }
}

*/

import { Layout } from '../models/layout.model';

export function fillBackground(
  context: CanvasRenderingContext2D,
  background: HTMLImageElement
): void {
  context.drawImage(background, 0, 0, 854, 480);
}

export function clearCanvas(context: CanvasRenderingContext2D): void {
  context.clearRect(0, 0, 854, 480);
}

export function fillLogo(
  context: CanvasRenderingContext2D,
  logo: HTMLImageElement
): void {
  context.drawImage(logo, 764, 10, 80, 80);
}

export function fillBanner(
  context: CanvasRenderingContext2D,
  banner: string,
  color: string
): void {
  const textWidth = context.measureText(banner).width;
  const width = textWidth + 40;

  const metrics = context.measureText(banner);
  const fontHeight =
    metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
  // const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  context.strokeStyle = color;
  context.fillStyle = color;
  context.fill();
  context.beginPath();
  context.roundRect(10, 480 - fontHeight - 10, width, fontHeight, [10, 40]);
  context.stroke();

  // TODO : set an option to set a custom banner color && toggle to white/black for contrast
  context.fillStyle = 'black';

  // TODO : set an option to set a custom font
  context.font = 'bold 40pt Courier';
  context.fillText(banner, 30, 450);
}

export function fillCamera(
  context: CanvasRenderingContext2D,
  camera: HTMLVideoElement,
  layout: Layout
): void {
  // show first camera in right bottom corner
  if (layout === Layout.FULL) {
    context.drawImage(camera, 0, 0, 854, 480);
  } else if (layout === Layout.SOLO_LAYOUT) {
    context.drawImage(camera, 40, 40, 774, 400);
  } else if (layout === Layout.PICTURE_IN_PICTURE) {
    context.drawImage(camera, 684, 380, 160, 90);
  }
  /*
  this.cameras.forEach((camera, index) => {
    context.drawImage(camera, 10 + (index * 170), 10, 160, 90);
  });
   */
}

export function fillScreen(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  layout: Layout
): void {
  if (
    video.srcObject &&
    layout !== Layout.FULL &&
    layout !== Layout.SOLO_LAYOUT
  ) {
    context.drawImage(video, 0, 0, 854, 480);
  }
}
