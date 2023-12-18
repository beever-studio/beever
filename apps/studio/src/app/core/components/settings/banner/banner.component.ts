import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'beever-banner',
  standalone: true,
  template: `
    <mat-list-item role="listitem">
      <div class="flex justify-between items-center">
        <span>{{ banner }}</span>
        <div>
          <button mat-icon-button (click)="toggle.emit()">
            <mat-icon
              matListItemIcon
              [svgIcon]="isActive ? 'visibility_off' : 'visibility'"
            ></mat-icon>
          </button>
          <button mat-icon-button>
            <mat-icon matListItemIcon svgIcon="more_vert"></mat-icon>
          </button>
        </div>
      </div>
    </mat-list-item>
  `,
  imports: [MatButtonModule, MatIconModule, MatListModule],
})
export class BannerComponent {
  @Input() banner!: string;
  @Input() isActive = false;

  @Output() toggle = new EventEmitter<void>();
}
