import { Component, computed, inject } from '@angular/core';
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

@Component({
  selector: 'beever-record',
  standalone: true,
  template: `
    <header class="flex justify-between w-full p-4">
      <a routerLink="/" class="font-caveat text-4xl"> BEEVER </a>
      <button mat-raised-button color="accent" (click)="startRecording()">
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
    <section class="flex justify-center items-start w-full gap-4">
      <section class="w-full flex flex-col items-center gap-2 m-2">
        <beever-video></beever-video>
        <beever-video-controls></beever-video-controls>
        <beever-backstage></beever-backstage>
      </section>
      <div class="max-w-[568px]">
        <mat-tab-group>
          <mat-tab [bodyClass]="['max-h-[calc(100vh-120px)]', 'pt-2']">
            <ng-template mat-tab-label>
              <div class="flex flex-col justify-center items-center">
                <mat-icon svgIcon="branding"></mat-icon>
                Brand
              </div>
            </ng-template>
            <beever-branding-container></beever-branding-container>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <div class="flex flex-col justify-center items-center">
                <mat-icon svgIcon="capture"></mat-icon>
                <span
                  [matBadge]="snapshotCount()"
                  matBadgeSize="small"
                  [matBadgeHidden]="!snapshotCount()"
                  matBadgePosition="above after"
                  >Snapshots</span
                >
              </div>
            </ng-template>
            <beever-snapshot-container></beever-snapshot-container>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <div class="flex flex-col justify-center items-center">
                <mat-icon svgIcon="banner"></mat-icon>
                Banners
              </div>
            </ng-template>
            <beever-banner-container></beever-banner-container>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <div class="flex flex-col justify-center items-center">
                <mat-icon svgIcon="chat"></mat-icon>
                Chat
              </div>
            </ng-template>
          </mat-tab>
        </mat-tab-group>
      </div>
    </section>
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
  ],
})
export default class RecordComponent {
  screenRecorderService = inject(ScreenRecorderService);

  snapshotCount = computed(() => this.screenRecorderService.snapshots().length);

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
