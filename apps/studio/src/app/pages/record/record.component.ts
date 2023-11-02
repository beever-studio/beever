import { Component, HostBinding, inject } from '@angular/core';
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

@Component({
  selector: 'beever-record',
  standalone: true,
  template: `
    <mat-toolbar class="flex justify-between">
      <a routerLink="/" class="font-caveat text-4xl text-white"> BEEVER </a>
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
    </mat-toolbar>
    <section class="flex justify-center w-full h-full mt-8 gap-4">
      <section class="flex flex-col justify-center items-center gap-2">
        <beever-video></beever-video>
        <beever-video-controls></beever-video-controls>
      </section>
      <mat-card class="min-h-full max-w-[568px]">
        <mat-tab-group>
          <mat-tab>
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
                Snapshots
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
      </mat-card>
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
  ],
})
export default class RecordComponent {
  screenRecorderService = inject(ScreenRecorderService);

  @HostBinding('class') get classes() {
    return 'flex flex-col justify-center items-start w-full';
  }

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
