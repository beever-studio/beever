import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'beever-tab',
  standalone: true,
  template: ` <ng-template><ng-content></ng-content></ng-template> `,
})
export class TabComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) icon: string = '';
  @Input() badgeCounter: number = 0;
  @ViewChild(TemplateRef) template!: TemplateRef<unknown>;
}
