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

@Component({
  selector: 'beever-record',
  standalone: true,
  template: `
    <mat-drawer-container class="flex-1" autosize>
      <beever-video></beever-video>
      <beever-video-controls *ngIf="isActive$ | async"></beever-video-controls>
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
  ],
})
export default class RecordComponent {
  screenRecorderService = inject(ScreenRecorderService);
  isActive$ = this.screenRecorderService.isActive$;

  activeMenu = signal<RecordMenu>('branding');

  @ViewChild('drawer') drawer!: MatDrawer;

  @HostBinding('class') get classes() {
    return 'flex justify-center items-start w-full';
  }

  toggle(type: RecordMenu): void {
    if (this.activeMenu() === type && this.drawer.opened) {
      void this.drawer.toggle();
    } else if (!this.drawer.opened) {
      void this.drawer.toggle();
    }

    this.activeMenu.set(type);
  }
}
