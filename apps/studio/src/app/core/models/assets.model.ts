export interface Assets {
  logo: {
    name: string;
    src: HTMLImageElement;
  } | null;
  background: {
    name: string;
    src: HTMLImageElement;
  } | null;
  color: string;
  banner: string | null;
}
