import {
  Component,
  HostBinding,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { VideoComponent } from '../../core/components/video.component';
import { VideoControlsComponent } from '../../core/components/video-controls.component';
import { ScreenRecorderService } from '../../core/services/screen-recorder.service';
import {
  AsyncPipe,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
} from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RecordMenuComponent } from '../../core/components/record-menu.component';
import { SnapshotContainerComponent } from '../../core/components/snapshot-container.component';
import { RecordMenu } from '../../core/models/record-menu.model';
import { BrandingContainerComponent } from '../../core/components/branding-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'beever-record',
  standalone: true,
  template: `
    <mat-toolbar class="flex justify-end">
      <button mat-raised-button color="accent" (click)="startRecording()">
        <mat-icon svgIcon="screen_record"></mat-icon>
        Record
      </button>
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
    </mat-toolbar>
    <section class="flex justify-center items-start w-full mt-16">
      <mat-drawer-container class="flex-1" autosize>
        <section class="flex flex-col justify-center items-center">
          <beever-video></beever-video>
          <beever-video-controls></beever-video-controls>
        </section>
        <mat-drawer #drawer mode="side" position="end" opened="true">
          <ng-container [ngSwitch]="activeMenu()">
            <beever-snapshot-container
              *ngSwitchCase="'snapshot'"
            ></beever-snapshot-container>
            <beever-branding-container
              *ngSwitchCase="'branding'"
            ></beever-branding-container>
          </ng-container>
        </mat-drawer>
      </mat-drawer-container>
      <beever-record-menu (toggle)="toggle($event)"></beever-record-menu>
    </section>
  `,
  imports: [
    VideoComponent,
    VideoControlsComponent,
    NgIf,
    AsyncPipe,
    MatSidenavModule,
    RecordMenuComponent,
    SnapshotContainerComponent,
    NgTemplateOutlet,
    NgSwitch,
    NgSwitchCase,
    BrandingContainerComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export default class RecordComponent {
  screenRecorderService = inject(ScreenRecorderService);
  isActive$ = this.screenRecorderService.isActive$;

  activeMenu = signal<RecordMenu>('branding');

  @ViewChild('drawer') drawer!: MatDrawer;

  @HostBinding('class') get classes() {
    return 'flex flex-col justify-center items-start w-full';
  }

  toggle(type: RecordMenu): void {
    if (this.activeMenu() === type && this.drawer.opened) {
      void this.drawer.toggle();
    } else if (!this.drawer.opened) {
      void this.drawer.toggle();
    }

    this.activeMenu.set(type);
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
