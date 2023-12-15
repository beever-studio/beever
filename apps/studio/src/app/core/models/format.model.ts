export type FormatType = 'landscape' | 'portrait';

export interface Format {
  type: FormatType;
  width: number;
  height: number;
}

export const LANDSCAPE_FORMAT: Format = {
  type: 'landscape',
  width: 1280,
  height: 720,
};

export const PORTRAIT_FORMAT: Format = {
  type: 'portrait',
  width: 0,
  height: 0,
};
