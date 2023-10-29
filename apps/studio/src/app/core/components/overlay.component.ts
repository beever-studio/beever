import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OverlayRef } from '@angular/cdk/overlay';
import { ScreenRecorderService } from '../services/screen-recorder.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'beever-overlay',
  template: `
    <button mat-raised-button type="button" (click)="selectScreen()">
      Select screen
    </button>
  `,
  standalone: true,
  imports: [MatButtonModule],
})
export class OverlayComponent {
  screenRecorderService = inject(ScreenRecorderService);
  destroyRef = inject(DestroyRef);
  overlayRef = inject(OverlayRef);

  selectScreen(): void {
    this.screenRecorderService
      .getStream()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.overlayRef.dispose());
  }
}
