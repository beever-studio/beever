import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { MatBadgeModule } from '@angular/material/badge';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'beever-record-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatBadgeModule, AsyncPipe],
  template: `
    <mat-action-list>
      <button
        class="flex justify-center items-center"
        mat-list-item
        (click)="toggle.emit()"
      >
        <mat-icon
          class="m-4"
          [matBadge]="snapshotCounter$ | async"
          [matBadgeHidden]="(snapshotCounter$ | async) === 0"
          matBadgeColor="warn"
          svgIcon="capture"
        ></mat-icon>
      </button>
    </mat-action-list>
  `,
})
export class RecordMenuComponent {
  screenRecorderService = inject(ScreenRecorderService);

  snapshotCounter$ = this.screenRecorderService.snapshots$.pipe(
    map((snapshots) => snapshots.length)
  );

  @Output() toggle = new EventEmitter();
}
