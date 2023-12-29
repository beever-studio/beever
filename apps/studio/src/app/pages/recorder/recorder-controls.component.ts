import { Component, HostBinding, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { EditorService } from '../../core/services/editor.service';

@Component({
  selector: 'beever-recorder-controls',
  standalone: true,
  imports: [MatIconModule, NgClass],
  template: `
    <div class="join">
      <button
        type="button"
        class="btn join-item h-20 w-28 flex flex-col justify-center"
        (click)="activateMic()"
      >
        <label class="swap" [ngClass]="{ 'swap-active': activeMic() }">
          <mat-icon class="swap-on fill-current" svgIcon="mic_off"></mat-icon>
          <mat-icon class="swap-off fill-current" svgIcon="mic"></mat-icon>
        </label>
        <span>{{ activeMic() ? 'Mute' : 'Unmute' }}</span>
      </button>
      <button
        type="button"
        class="btn join-item h-20 w-28 flex flex-col justify-center"
        (click)="activateCamera()"
      >
        <label class="swap" [ngClass]="{ 'swap-active': activeCamera() }">
          <mat-icon
            class="swap-on fill-current"
            svgIcon="videocam_off"
          ></mat-icon>
          <mat-icon class="swap-off fill-current" svgIcon="videocam"></mat-icon>
        </label>
        <span>{{ activeCamera() ? 'Show cam' : 'Hide cam' }}</span>
      </button>
      <button
        type="button"
        class="btn join-item h-20 w-28 flex flex-col justify-center"
        (click)="activateScreen()"
      >
        <label class="swap" [ngClass]="{ 'swap-active': activeScreen() }">
          <mat-icon
            class="swap-on fill-current"
            svgIcon="stop_screen_share"
          ></mat-icon>
          <mat-icon class="swap-off fill-current" svgIcon="present"></mat-icon>
        </label>
        <span>{{ activeScreen() ? 'Present' : 'Stop screen' }}</span>
      </button>
      <button
        type="button"
        class="btn join-item h-20 w-28 flex flex-col justify-center"
        (click)="activateMic()"
      >
        <mat-icon svgIcon="settings"></mat-icon>
        <span>Settings</span>
      </button>
    </div>
    <div class="join">
      <div class="btn join-item h-20 w-28 flex flex-col justify-center">
        <label class="swap">
          <input type="checkbox" />
          <mat-icon class="swap-on" svgIcon="mic"></mat-icon>
          <mat-icon class="swap-off" svgIcon="present"></mat-icon>
        </label>
        <span>Layouts</span>
      </div>
      <div class="btn join-item h-20 w-28 flex flex-col justify-center">
        <label class="swap">
          <input type="checkbox" />
          <mat-icon class="swap-on" svgIcon="mic"></mat-icon>
          <mat-icon class="swap-off" svgIcon="present"></mat-icon>
        </label>
        <span>Background</span>
      </div>
      <div class="btn join-item h-20 w-28 flex flex-col justify-center">
        <label class="swap">
          <input type="checkbox" />
          <mat-icon class="swap-on" svgIcon="mic"></mat-icon>
          <mat-icon class="swap-off" svgIcon="present"></mat-icon>
        </label>
        <span>Overlay</span>
      </div>
      <div class="btn join-item h-20 w-28 flex flex-col justify-center">
        <label class="swap">
          <input type="checkbox" />
          <mat-icon class="swap-on" svgIcon="mic"></mat-icon>
          <mat-icon class="swap-off" svgIcon="present"></mat-icon>
        </label>
        <span>Logo</span>
      </div>
    </div>
  `,
})
export class RecorderControlsComponent {
  #editorService = inject(EditorService);
  activeMic = signal<boolean>(false);
  activeCamera = signal<boolean>(false);
  activeScreen = signal<boolean>(false);

  @HostBinding('class') class = 'flex gap-4';

  activateMic(): void {
    this.activeMic.update((active) => !active);
  }

  activateCamera(): void {
    this.activeCamera.update((active) => !active);
  }

  activateScreen(): void {
    if (!this.activeScreen()) {
      this.#editorService.shareScreen();
    }
    this.activeScreen.update((active) => !active);
  }

  foo() {
    console.log('foo');
  }
}
