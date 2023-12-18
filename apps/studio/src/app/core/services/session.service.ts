import { Injectable, signal } from '@angular/core';
import { imageLoader } from '../../shared/utils/image-loader.util';
import { iif, of, take } from 'rxjs';
import { Layout } from '../models/layout.model';
import {
  Format,
  LANDSCAPE_FORMAT,
  PORTRAIT_FORMAT,
} from '../models/format.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { Assets } from '../models/assets.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  banner = signal<string | undefined>(undefined);
  background = signal<HTMLImageElement | undefined>(undefined);
  color = signal<string>('#FFFFFF');
  format = signal<Format>(LANDSCAPE_FORMAT);

  assets = signal<Assets>({
    logo: null,
    background: null,
    color: '#FFFFFF',
    banner: null,
  });

  assets$ = toObservable(this.assets);

  public setLogo(logo: string | null): void {
    iif(() => !logo, of(null), imageLoader(logo!))
      .pipe(take(1))
      .subscribe((image) => {
        this.assets.update((assets) => ({
          ...assets,
          logo: image ? { name: logo!, src: image } : null,
        }));
      });
  }

  public setBanner(banner: string | null): void {
    this.assets.update((assets) => ({
      ...assets,
      banner,
    }));
  }

  public setBackground(url: string | null): void {
    iif(() => !url, of(null), imageLoader(url!))
      .pipe(take(1))
      .subscribe((image) => {
        this.assets.update((assets) => ({
          ...assets,
          background: image ? { name: url!, src: image } : null,
        }));
      });
  }

  setColor(color: string): void {
    this.assets.update((assets) => ({
      ...assets,
      color,
    }));
  }

  toggleFormat(): void {
    if (this.format().type === 'portrait') {
      this.format.set(LANDSCAPE_FORMAT);
    }
    this.format.set(PORTRAIT_FORMAT);
  }
}
