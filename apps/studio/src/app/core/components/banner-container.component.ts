import { Component, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { BannerComponent } from './banner.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'beever-banner-container',
  standalone: true,
  template: `
    <mat-list role="list">
      <beever-banner
        *ngFor="let banner of banners()"
        [banner]="banner"
        [isActive]="activeBanner() === banner"
        (toggle)="toggle(banner)"
      >
      </beever-banner>
    </mat-list>
  `,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    BannerComponent,
    NgForOf,
  ],
})
export class BannerContainerComponent {
  screenRecorderService = inject(ScreenRecorderService);

  banners = signal<string[]>(['Beever', 'Angular Devs France', 'Gerome']);

  activeBanner = signal<string | undefined>(undefined);

  toggle(banner: string): void {
    if (this.activeBanner() === banner) {
      this.activeBanner.set(undefined);
      this.screenRecorderService.setBanner(undefined);
    } else {
      this.activeBanner.set(banner);
      this.screenRecorderService.setBanner(banner);
    }
  }
}
