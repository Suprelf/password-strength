import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit {

  passwordFormControl = new FormControl('', [Validators.required]);
  customMatcher = new CustomErrorStateMatcher();
  strengthLvl = 'none';
  
  easyPasswords = [RegExp(/^[A-Za-z]*$/gm), RegExp(/^[0-9]*$/gm), RegExp(/^[$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm)]
  mediumPasswords = [RegExp(/^[\p{P}\p{S}A-Za-z]*$/gm), RegExp(/^[\p{P}\p{S}0-9]*$/gm), RegExp(/^[A-Za-z0-9]*$/gm)]
  strongPasswords = [RegExp(/^[\p{P}\p{S}A-Za-z0-9]*$/gm)]





  constructor() {
    this.passwordFormControl.valueChanges.subscribe(()=>{
      const password = this.passwordFormControl.value

      this.strongPasswords.some((regex) => {
        if ((password?.match(regex)) && (password!='') ) {
          this.strengthLvl = 'strong'
          console.log(this.strengthLvl)
        }
      })

      this.mediumPasswords.some((regex) => {
        if ((password?.match(regex)) && (password!='') ) {
          this.strengthLvl = 'medium'
          console.log(this.strengthLvl)
        }
      })
      
      this.easyPasswords.some((regex) => {
        if ((password?.match(regex)) && (password!='') ) {
          this.strengthLvl = 'easy'
          console.log(this.strengthLvl)
        }
      })
    })
  }

  ngOnInit(): void {
  }

  

  


}
