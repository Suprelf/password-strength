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
  strengthLvl = '';
  
  easyPasswords = [
    RegExp(/^[A-Za-zа-яА-Я]*$/gm), 
    RegExp(/^[0-9]*$/gm), 
    RegExp(/^[$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm)]
  mediumPasswords = [
    RegExp(/^[A-Za-zа-яА-Я$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm), 
    RegExp(/^[0-9$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm), 
    RegExp(/^[A-Za-z0-9а-яА-Я]*$/gm)]
  strongPasswords = [RegExp(/^[A-Za-z0-9а-яА-Я$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm)]

  constructor() {
    this.passwordFormControl.valueChanges.subscribe(()=>{
      const password = this.passwordFormControl.value

      this.strongPasswords.some((regex) => {
        if ((password?.match(regex)) && (password!='') ) {
          this.passwordFormControl.setErrors({'strong': true})
          console.log(this.strengthLvl)
        }
      })

      this.mediumPasswords.some((regex) => {
        if ((password?.match(regex)) && (password!='') ) {
          this.passwordFormControl.setErrors({'medium': true})
          console.log(this.strengthLvl)
        }
      })
      
      this.easyPasswords.some((regex) => {
        if ((password?.match(regex)) && (password!='') ) {
          this.passwordFormControl.setErrors({'easy': true})
          console.log(this.strengthLvl)
        }
      })

      this.strongPasswords.some((regex) => {
        if ( !(password?.match(regex)) && (password!='') ) {
          this.passwordFormControl.setErrors({'else': true})
          console.log(this.strengthLvl)
        }
      })

    })
  }

  ngOnInit(): void {
  }


}
