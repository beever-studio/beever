import {
  Component,
  ContentChildren,
  HostBinding,
  QueryList,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TabComponent } from './tab.component';
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'beever-tabs',
  standalone: true,
  template: `
    <div class="overflow-auto w-80">
      <div
        *ngFor="let tab of tabs; let i = index"
        id="panel-{{ i }}"
        role="tabpanel"
        aria-labelledby="tab-{{ i }}"
      >
        <ng-container *ngIf="activeTab() === i">
          <ng-container [ngTemplateOutlet]="tab.template"></ng-container>
        </ng-container>
      </div>
    </div>
    <div class="flex flex-col" role="tablist" aria-label="Sample Tabs">
      <button
        *ngFor="let tab of tabs; let i = index"
        class="h-16 w-16"
        [ngClass]="{ 'bg-violet-300 rounded': activeTab() === i }"
        role="tab"
        matRipple
        [attr.aria-selected]="activeTab() === i"
        aria-controls="panel-{{ i }}"
        id="tab-{{ i }}"
        (click)="toggleTab(i)"
      >
        <mat-icon [svgIcon]="tab.icon"></mat-icon>
      </button>
    </div>
  `,
  imports: [
    MatIconModule,
    NgForOf,
    NgTemplateOutlet,
    NgIf,
    NgClass,
    MatRippleModule,
  ],
})
export class TabsComponent {
  activeTab = signal(0);

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @HostBinding('class') class = 'flex border-2 border-gray-300 rounded-xl p-1';

  toggleTab(index: number): void {
    this.activeTab.set(index);
  }
}
