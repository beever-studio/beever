import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'beever-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
  }
}
