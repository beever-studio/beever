import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HeaderComponent } from './core/components/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'beever-root',
  template: `
    <main class="flex flex-col items-center justify-center">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'present',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/present.svg')
    );
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
    );
    iconRegistry.addSvgIcon(
      'mic',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mic.svg')
    );
    iconRegistry.addSvgIcon(
      'chat',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/chat.svg')
    );
    iconRegistry.addSvgIcon(
      'banner',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/banner.svg')
    );
    iconRegistry.addSvgIcon(
      'visibility',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg')
    );
    iconRegistry.addSvgIcon(
      'more_vert',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg')
    );
    iconRegistry.addSvgIcon(
      'pause',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/pause.svg')
    );
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg')
    );
    iconRegistry.addSvgIcon(
      'volume_off',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/volume_off.svg')
    );
    iconRegistry.addSvgIcon(
      'volume',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/volume.svg')
    );
    iconRegistry.addSvgIcon(
      'videocam',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/videocam.svg')
    );
    iconRegistry.addSvgIcon(
      'videocam_off',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/videocam_off.svg')
    );
    iconRegistry.addSvgIcon(
      'capture',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/capture.svg')
    );
    iconRegistry.addSvgIcon(
      'download',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/download.svg')
    );
    iconRegistry.addSvgIcon(
      'cancel_presentation',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/cancel_presentation.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
    );
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg')
    );
    iconRegistry.addSvgIcon(
      'stop',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/stop.svg')
    );
    iconRegistry.addSvgIcon(
      'branding',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/palette.svg')
    );
    iconRegistry.addSvgIcon(
      'screen_record',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/screen_record.svg')
    );
    iconRegistry.addSvgIcon(
      'picture_in_picture',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/picture_in_picture.svg'
      )
    );
  }
}
