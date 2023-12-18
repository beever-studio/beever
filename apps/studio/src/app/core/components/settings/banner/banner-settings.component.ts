import { Component, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreviewService } from '../../../services/preview.service';
import { BannerComponent } from './banner.component';
import { NgForOf } from '@angular/common';
import { SessionService } from '../../../services/session.service';
import { EditorService } from '../../../services/editor.service';
import { DEFAULT_BANNERS } from '../../consts/banner.const';

@Component({
  selector: 'beever-banner-settings',
  standalone: true,
  template: `
    <mat-list role="list">
      <beever-banner
        *ngFor="let banner of banners()"
        [banner]="banner"
        [isActive]="assets().banner === banner"
        (toggle)="toggle(banner)"
      >
      </beever-banner>
    </mat-list>
  `,
  imports: [MatListModule, BannerComponent, NgForOf],
})
export class BannerSettingsComponent {
  editorService = inject(EditorService);
  assets = this.editorService.assets;

  banners = signal<string[]>(DEFAULT_BANNERS);

  toggle(banner: string): void {
    if (this.assets().banner === banner) {
      this.editorService.setBanner(null);
    } else {
      this.editorService.setBanner(banner);
    }
  }
}
