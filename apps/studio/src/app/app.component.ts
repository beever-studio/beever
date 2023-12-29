import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HeaderComponent } from './core/components/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'beever-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  icons = [
    'present',
    'mic',
    'chat',
    'banner',
    'visibility',
    'visibility_off',
    'more_vert',
    'pause',
    'add',
    'volume_off',
    'volume',
    'videocam',
    'videocam_off',
    'capture',
    'download',
    'cancel_presentation',
    'delete',
    'close',
    'stop',
    'branding',
    'screen_record',
    'picture_in_picture',
    'landscape',
    'portrait',
    'arrow_dropdown',
    'mic_off',
    'settings',
    'stop_screen_share',
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.icons.forEach((icon) =>
      iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`)
      )
    );
  }
}
