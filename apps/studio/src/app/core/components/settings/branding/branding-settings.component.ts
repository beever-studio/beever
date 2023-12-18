import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { EditorService } from '../../../services/editor.service';
import { LogoSettingsComponent } from './logo-settings.component';
import { BackgroundSettingsComponent } from './background-settings.component';
import { ColorSettingsComponent } from './color-settings.component';

@Component({
  selector: 'beever-branding-settings',
  standalone: true,
  imports: [
    LogoSettingsComponent,
    BackgroundSettingsComponent,
    ColorSettingsComponent,
  ],
  template: `
    <beever-logo-settings></beever-logo-settings>
    <beever-color-settings></beever-color-settings>
    <beever-background-settings></beever-background-settings>
  `,
})
export class BrandingSettingsComponent implements OnInit {
  editorService = inject(EditorService);

  @HostBinding('class') get class() {
    return 'pt-4 px-2 block';
  }

  ngOnInit() {
    // TODO move somewhere else
    this.editorService.setLogo('assets/images/logo.png');
    this.editorService.setBackground('assets/images/background.webp');
  }
}
