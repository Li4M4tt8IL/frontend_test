import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  template: `
  <span [innerHTML]="text"></span>
  `
})
export class TextComponent {
  @Input() text!:string;
}
