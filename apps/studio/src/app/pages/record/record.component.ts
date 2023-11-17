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
      <div class="flex border-2 border-gray-300 rounded-xl p-1">
        <div class="overflow-auto w-80">
          <div
            id="panel-1"
            role="tabpanel"
            tabindex="0"
            aria-labelledby="tab-1"
          >
            <beever-branding-container
              class="overflow-auto"
            ></beever-branding-container>
          </div>
          <div
            id="panel-2"
            role="tabpanel"
            tabindex="0"
            aria-labelledby="tab-2"
            hidden
          >
            <beever-snapshot-container></beever-snapshot-container>
          </div>
          <div
            id="panel-3"
            role="tabpanel"
            tabindex="0"
            aria-labelledby="tab-3"
            hidden
          >
            <beever-banner-container></beever-banner-container>
          </div>
        </div>
        <div class="flex flex-col" role="tablist" aria-label="Sample Tabs">
          <button
            class="h-16 w-16"
            role="tab"
            aria-selected="true"
            aria-controls="panel-1"
            id="tab-1"
          >
            <mat-icon svgIcon="branding"></mat-icon>
          </button>
          <button
            class="h-16 w-16"
            role="tab"
            aria-selected="false"
            aria-controls="panel-2"
            id="tab-2"
          >
            <mat-icon svgIcon="capture"></mat-icon>
          </button>
          <button
            class="h-16 w-16"
            role="tab"
            aria-selected="false"
            aria-controls="panel-3"
            id="tab-3"
          >
            <mat-icon svgIcon="banner"></mat-icon>
          </button>
          <button
            class="h-16 w-16"
            role="tab"
            aria-selected="false"
            aria-controls="panel-4"
            id="tab-4"
          >
            <mat-icon svgIcon="chat"></mat-icon>
          </button>
        </div>
      </div>
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
