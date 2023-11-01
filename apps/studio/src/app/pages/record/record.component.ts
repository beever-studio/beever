import { Component, HostBinding, inject, ViewChild } from '@angular/core';
import { VideoComponent } from '../../core/components/video.component';
import { VideoControlsComponent } from '../../core/components/video-controls.component';
import { ScreenRecorderService } from '../../core/services/screen-recorder.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RecordMenuComponent } from '../../core/components/record-menu.component';
import { SnapshotContainerComponent } from '../../core/components/snapshot-container.component';

@Component({
  selector: 'beever-record',
  standalone: true,
  template: `
    <mat-drawer-container class="flex-1" autosize>
      <beever-video></beever-video>
      <beever-video-controls *ngIf="isActive$ | async"></beever-video-controls>
      <mat-drawer #drawer mode="side" position="end" opened="true">
        <beever-snapshot-container></beever-snapshot-container>
      </mat-drawer>
    </mat-drawer-container>
    <beever-record-menu (toggle)="drawer.toggle()"></beever-record-menu>
  `,
  imports: [
    VideoComponent,
    VideoControlsComponent,
    NgIf,
    AsyncPipe,
    MatSidenavModule,
    RecordMenuComponent,
    SnapshotContainerComponent,
  ],
})
export default class RecordComponent {
  screenRecorderService = inject(ScreenRecorderService);
  isActive$ = this.screenRecorderService.isActive$;

  @ViewChild('drawer') drawer!: MatDrawer;

  @HostBinding('class') get classes() {
    return 'flex justify-center items-start w-full';
  }
}
