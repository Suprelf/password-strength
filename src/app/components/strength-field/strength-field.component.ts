import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-strength-field',
  templateUrl: './strength-field.component.html',
  styleUrls: ['./strength-field.component.scss']
})
export class StrengthFieldComponent implements OnInit {
  @Input() strength: Number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['strength'].currentValue)
    this.strength = changes['strength'].currentValue
  }

}
