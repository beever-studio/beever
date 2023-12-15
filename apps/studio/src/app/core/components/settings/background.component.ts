import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Background } from '../../models/background.model';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { BeeverRenameComponent } from '../modals/rename.component';

@Component({
  selector: 'beever-background',
  standalone: true,
  template: `
    <button
      class="rounded p-1 border-2 border-transparent w-full flex gap-4 items-center"
      [ngClass]="{ 'active-logo': isActive, backdrop: isOpen() }"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
    >
      <img class="h-[4.5rem] w-[8rem] rounded" [src]="background.url" alt="" />
      <div>
        <span>{{ background.name }}</span>
      </div>
    </button>
    <button></button>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
    >
      <ul class="flex gap-2 mt-2 mr-2">
        <li>
          <button mat-mini-fab class="!bg-white" (click)="activate.emit()">
            <mat-icon
              [svgIcon]="isActive ? 'visibility_off' : 'visibility'"
            ></mat-icon>
          </button>
        </li>
        <li>
          <button mat-mini-fab class="!bg-white" [matMenuTriggerFor]="menu">
            <mat-icon svgIcon="more_vert"></mat-icon>
          </button>
        </li>
      </ul>
    </ng-template>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="rename()">Rename</button>
      <button mat-menu-item (click)="delete.emit()">Delete</button>
    </mat-menu>
  `,
  imports: [
    NgClass,
    CdkConnectedOverlay,
    MatButtonModule,
    MatIconModule,
    CdkOverlayOrigin,
    MatMenuModule,
  ],
})
export class BackgroundComponent implements AfterViewInit {
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  dialog = inject(MatDialog);

  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'center',
      overlayX: 'center',
      overlayY: 'center',
    },
  ];

  isOpen = signal(false);

  @Input() background!: Background;
  @Input() isActive!: boolean;

  @Output() activate = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  @ViewChild(CdkConnectedOverlay) trigger!: CdkConnectedOverlay;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  @HostBinding('class') get hostClass() {
    return 'flex items-center';
  }

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
          if (
            this.trigger.open &&
            !isInsideOverlay &&
            !this.menuTrigger.menuOpen
          ) {
            this.isOpen.set(false);
          }
        }
      });
  }

  rename(): void {
    this.dialog
      .open(BeeverRenameComponent, {
        data: {
          name: this.background.name,
        },
      })
      .afterClosed()
      .subscribe((name) => {
        if (name) {
          this.background.name = name;
        }
      });
  }
}
