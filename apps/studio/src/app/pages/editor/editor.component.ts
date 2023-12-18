import { Component, HostBinding, inject } from '@angular/core';
import { PreviewComponent } from '../../core/components/preview.component';
import { VideoControlsComponent } from '../../core/components/video-controls.component';
import { SnapshotSettingsComponent } from '../../core/components/settings/snapshot/snapshot-settings.component';
import { BrandingSettingsComponent } from '../../core/components/settings/branding/branding-settings.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BannerSettingsComponent } from '../../core/components/settings/banner/banner-settings.component';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { BackstageComponent } from '../../core/components/backstage.component';
import { LayoutContainerComponent } from '../../core/components/layouts/layout-container.component';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { TabComponent } from '../../core/components/tabs/tab.component';
import { EditorService } from '../../core/services/editor.service';

@Component({
  selector: 'beever-editor',
  standalone: true,
  template: `
    <header class="flex justify-between w-full p-4">
      <a routerLink="/" class="font-caveat text-4xl"> BEEVER </a>
      <button mat-raised-button color="primary" (click)="startRecording()">
        <mat-icon svgIcon="screen_record"></mat-icon>
        Record
      </button>
      <!--
          <button mat-raised-button>
            <mat-icon svgIcon="pause"></mat-icon>
          </button>
          <button mat-raised-button color="warn" (click)="stopRecording()">
            <mat-icon svgIcon="screen_record"></mat-icon>
            End Recording
          </button>
          <button mat-stroked-button (click)="downloadRecording()">
            <mat-icon svgIcon="download"></mat-icon>
            Download Recording
          </button>
          -->
    </header>
    <section class="flex flex-1 justify-between items-stretch h-0 gap-4 px-2">
      <div class="flex flex-1 gap-1 justify-center">
        <div class="flex flex-col">
          <beever-preview></beever-preview>
          <beever-video-controls></beever-video-controls>
        </div>
        <beever-layout-container></beever-layout-container>
      </div>
      <beever-tabs>
        <beever-tab title="branding" icon="branding">
          <beever-branding-settings
            class="overflow-auto"
          ></beever-branding-settings>
        </beever-tab>
        <beever-tab title="snpashots" icon="capture">
          <beever-snapshot-settings
            class="overflow-auto"
          ></beever-snapshot-settings>
        </beever-tab>
        <beever-tab title="banners" icon="banner">
          <beever-banner-settings
            class="overflow-auto"
          ></beever-banner-settings>
        </beever-tab>
      </beever-tabs>
    </section>
    <beever-backstage></beever-backstage>
  `,
  imports: [
    PreviewComponent,
    VideoControlsComponent,
    SnapshotSettingsComponent,
    BrandingSettingsComponent,
    BannerSettingsComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    RouterLink,
    MatBadgeModule,
    BackstageComponent,
    LayoutContainerComponent,
    TabsComponent,
    TabComponent,
  ],
})
export default class EditorComponent {
  editorService = inject(EditorService);

  @HostBinding('class') class = 'flex flex-col h-full';

  startRecording(): void {
    this.editorService.startRecording();
  }

  stopRecording(): void {
    this.editorService.stopRecording();
  }

  downloadRecording(): void {
    this.editorService.downloadRecording();
  }
}
