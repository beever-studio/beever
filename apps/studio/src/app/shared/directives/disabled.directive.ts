import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[beeverDisabled]',
  standalone: true,
})
export class DisabledDirective {
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);

  @Input() set beeverDisabled(disabled: boolean | null) {
    this.disabled = !!disabled;
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'aria-disabled',
      String(!!disabled)
    );
  }

  @HostBinding('class.disabled') disabled = false;
}
