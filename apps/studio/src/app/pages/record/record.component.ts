import { Component, computed, HostBinding, inject } from '@angular/core';
import { VideoComponent } from '../../core/components/video.component';
import { VideoControlsComponent } from '../../core/components/video-controls.component';
import { ScreenRecorderService } from '../../core/services/screen-recorder.service';
import { SnapshotContainerComponent } from '../../core/components/snapshot-container.component';
import { BrandingContainerComponent } from '../../core/components/branding-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BannerContainerComponent } from '../../core/components/banner-container.component';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { BackstageComponent } from '../../core/components/backstage.component';
import { LayoutContainerComponent } from '../../core/components/layouts/layout-container.component';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { TabComponent } from '../../core/components/tabs/tab.component';

@Component({
  selector: 'beever-record',
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
          <beever-video></beever-video>
          <beever-video-controls></beever-video-controls>
        </div>
        <beever-layout-container></beever-layout-container>
      </div>
      <beever-tabs>
        <beever-tab title="branding" icon="branding">
          <beever-branding-container
            class="overflow-auto"
          ></beever-branding-container>
        </beever-tab>
        <beever-tab title="snpashots" icon="capture">
          <beever-snapshot-container
            class="overflow-auto"
          ></beever-snapshot-container>
        </beever-tab>
        <beever-tab title="banners" icon="banner">
          <beever-banner-container
            class="overflow-auto"
          ></beever-banner-container>
        </beever-tab>
      </beever-tabs>
    </section>
    <beever-backstage></beever-backstage>
  `,
  imports: [
    VideoComponent,
    VideoControlsComponent,
    SnapshotContainerComponent,
    BrandingContainerComponent,
    BannerContainerComponent,
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
export default class RecordComponent {
  screenRecorderService = inject(ScreenRecorderService);

  snapshotCount = computed(() => this.screenRecorderService.snapshots().length);

  @HostBinding('class') class = 'flex flex-col h-full';
  startRecording(): void {
    this.screenRecorderService.startRecording();
  }

  stopRecording(): void {
    this.screenRecorderService.stopRecording();
  }

  downloadRecording(): void {
    this.screenRecorderService.download();
  }
}
