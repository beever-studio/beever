export interface VideoSource {
  type: VideoSourceType;
  src: HTMLVideoElement;
  isActive: boolean;
}

export type VideoSourceType = 'camera' | 'screen';
