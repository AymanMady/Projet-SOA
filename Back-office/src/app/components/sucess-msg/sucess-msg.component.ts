import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-sucess-msg',
  imports: [],
  templateUrl: './sucess-msg.component.html',
  styleUrl: './sucess-msg.component.css'
})
export class SucessMsgComponent {

  @Input() msg = '';
}
