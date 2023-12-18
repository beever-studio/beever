import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ZoomComponent } from '../../modals/zoom.component';
import { downloadSnapshot } from '../../../../shared/utils/download-snapshot.util';
import { NgClass } from '@angular/common';

@Component({
  selector: 'beever-snapshot',
  standalone: true,
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    NgClass,
  ],
  template: `
    <img
      class="w-60 h-auto cursor-pointer"
      [ngClass]="{ backdrop: isOpen() }"
      [src]="snapshot"
      alt=""
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
      (click)="zoom()"
    />
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
    >
      <ul class="flex gap-2 mt-2 mr-2">
        <li>
          <button mat-mini-fab class="!bg-white" (click)="download()">
            <mat-icon svgIcon="download"></mat-icon>
          </button>
        </li>
        <li>
          <button mat-mini-fab class="!bg-white" (click)="delete.emit()">
            <mat-icon svgIcon="delete"></mat-icon>
          </button>
        </li>
      </ul>
    </ng-template>
  `,
})
export class SnapshotComponent implements AfterViewInit {
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  dialog = inject(MatDialog);

  isOpen = signal(false);

  @Input() snapshot!: string;
  @Output() delete = new EventEmitter();

  @ViewChild(CdkConnectedOverlay) trigger!: CdkConnectedOverlay;

  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  ngAfterViewInit() {
    fromEvent(document, 'mouseover')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((mouseEvent) => {
        const event = mouseEvent as MouseEvent;
        const elementRect =
          this.elementRef.nativeElement.getBoundingClientRect();
        const isInsideElement =
          event.clientX >= elementRect.left &&
          event.clientX <= elementRect.right &&
          event.clientY >= elementRect.top &&
          event.clientY <= elementRect.bottom;

        let isInsideOverlay = false;

        if (this.trigger.open) {
          const overlayRect =
            this.trigger.overlayRef.overlayElement.getBoundingClientRect();
          isInsideOverlay =
            event.clientX >= overlayRect.left &&
            event.clientX <= overlayRect.right &&
            event.clientY >= overlayRect.top &&
            event.clientY <= overlayRect.bottom;
        }

        if (isInsideElement) {
          if (!this.trigger.open) {
            this.isOpen.set(true);
          }
        } else {
          if (this.trigger.open && !isInsideOverlay) {
            this.isOpen.set(false);
          }
        }
      });
  }

  zoom(): void {
    this.dialog.open(ZoomComponent, {
      data: this.snapshot,
      backdropClass: 'backdrop',
    });
  }

  download(): void {
    downloadSnapshot(this.snapshot);
  }
}
