import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
const electron = (<any>window).require('electron');

declare global {
  interface Window {
    require: any;
  }
}

const { remote } = window.require('electron');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sticky-notes';

  isAlwaysOnTop: boolean = true;

  constructor() {}

  newNote():void {
    electron.ipcRenderer.send('new-note', "testing");
  }

  closeApp():void {
    electron.ipcRenderer.send('close');
  }

  minimizeApp():void {
    electron.ipcRenderer.send('minimize');
  }

  toggleOnTop():void {
    this.isAlwaysOnTop = !this.isAlwaysOnTop;
    electron.ipcRenderer.send('toggle-on-top');
  }

  execCmd(command: string, value: any = null) {
    document.execCommand(command, false, value);
  }

  onFontSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.execCmd('fontSize', selectElement.value);
  }
}
