import { inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { OverlayComponent } from '../components/overlay.component';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  overlay = inject(Overlay);
  injector = inject(Injector);

  createOverlay(vcr: ViewContainerRef): OverlayRef {
    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'is-active'],
      backdropClass: 'modal-background',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(vcr.element)
        .withPositions([
          {
            originX: 'center',
            originY: 'center',
            overlayX: 'center',
            overlayY: 'center',
          },
        ]),
    });

    const overlayRef = this.overlay.create(config);
    const injector = this.createInjector(overlayRef);
    overlayRef.attach(new ComponentPortal(OverlayComponent, vcr, injector));
    return overlayRef;
  }

  createInjector(overlayRef: OverlayRef): Injector {
    return new PortalInjector(
      this.injector,
      new WeakMap([[OverlayRef, overlayRef]])
    );
  }
}
