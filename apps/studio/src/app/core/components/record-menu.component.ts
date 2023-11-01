import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { MatBadgeModule } from '@angular/material/badge';
import { map } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { RecordMenu } from '../models/record-menu.model';

@Component({
  selector: 'beever-record-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatBadgeModule, AsyncPipe, NgClass],
  template: `
    <mat-action-list>
      <button
        class="flex justify-center items-center"
        mat-list-item
        (click)="toggleMenu('branding')"
      >
        <mat-icon
          class="m-4"
          [ngClass]="{ 'active-menu-icon': activeMenu() === 'branding' }"
          svgIcon="branding"
        ></mat-icon>
      </button>
      <button
        class="flex justify-center items-center"
        mat-list-item
        (click)="toggleMenu('snapshot')"
      >
        <mat-icon
          class="m-4"
          [ngClass]="{ 'active-menu-icon': activeMenu() === 'snapshot' }"
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

  activeMenu = signal<RecordMenu>('snapshot');

  snapshotCounter$ = this.screenRecorderService.snapshots$.pipe(
    map((snapshots) => snapshots.length)
  );

  @Output() toggle = new EventEmitter<RecordMenu>();

  toggleMenu(menu: RecordMenu): void {
    this.activeMenu.set(menu);
    this.toggle.emit(menu);
  }
}
