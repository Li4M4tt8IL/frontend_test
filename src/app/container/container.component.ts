import { Component, signal } from '@angular/core';
import data from '../data.json'
import { TextComponent } from '../text/text.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [TextComponent, CommonModule],
  template: `
  <div class="container">
    <div class="naglowek">
      <h1>Nagłówek H1</h1>
      <hr>
    </div>
    <content>
      <div class="pierwszy">
        <h2>BLOK PIERWSZY</h2>
        <div class="wrapper">
          <label class="radio">
            <input (click)="selectOption(1)" type="radio" id="op1" name="opcja" value="op1" />
            <span class="text">Opcja pierwsza</span>
            <span class="mark"></span>
          </label>
          <label class="radio">
            <input (click)="selectOption(2)" type="radio" id="op2" name="opcja" value="op2" />
            <span class="text">Opcja druga</span>
            <span class="mark"></span>
          </label>
          <label class="radio">
            <input (click)="selectOption(3)" type="radio" id="op3" name="opcja" value="op3" />
            <span class="text">Opcja losowa</span>
            <span class="mark"></span>
          </label>
        </div>
      </div>
      <div class="drugi">
        <h2>BLOK DRUGI</h2>
        <div class="wrapper">
          <button (click)="editText(1)" class="button"><b>ZASTĄP</b></button>
          <button (click)="editText(2)" class="button"><b>DOKLEJ</b></button>
        </div>
      </div>
      <div class="trzeci">
        <h2>BLOK Z DŁUGĄ NAZWĄ KTÓRA SAMA SIE PRZYTNIE</h2>
        <div class="wrapper">
          <app-text *ngFor="let text of textList" [text]="text"/>
        </div>
      </div>
    </content>
  </div>
  `,
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  protected option = signal(-1);
  protected lastOption = signal(-1);
  protected randomLastOption = signal(-1);

  textList:string[] = []

  selectOption(selected:number) {
    this.option.set(selected);
  }

  generateUniqueRandomNumber(previousNumber: number, min: number, max: number): number {
    let newNumber: number;
    do {
        newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (newNumber === previousNumber);
    return newNumber;
}

  editText(option:number) {
    let id:number;
    switch(this.option()) {
      case -1:
        alert("Proszę wybrać opcję!");
        return;
      case 1:
        id = 0;
        break;
      case 2:
        id = 1;
        break;
      case 3:
        id = this.generateUniqueRandomNumber(this.randomLastOption(), 0, 5);
        this.randomLastOption.set(id);
        break;
    }

    switch(option) {
      case 1:
        this.textList = [data[id!]["content"]!]
        break;
      case 2:
        if(this.lastOption() === id!) {
          alert("Wpis powielony!");
          return;
        }
        this.textList.push(data[id!]["content"]!);
        this.textList.sort();
        break;
    }
    this.lastOption.set(id!);
  }
}
