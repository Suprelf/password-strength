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
  strengthLvl = 0;

  easyPasswords = [
    RegExp(/^[A-Za-zа-яА-Я]*$/gm),
    RegExp(/^[0-9]*$/gm),
    RegExp(/^[$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm)]
  mediumPasswords = [
    RegExp(/^[A-Za-zа-яА-Я$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm),
    RegExp(/^[0-9$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm),
    RegExp(/^[A-Za-z0-9а-яА-Я]*$/gm)]
  strongPasswords = [RegExp(/^[A-Za-z0-9а-яА-Я$&+,:;=?@#|\\/'<>.^*()%!_-]*$/gm)]
  shortPasswords = [RegExp(/^.{8,}$/)]

  constructor() {
    this.passwordFormControl.valueChanges.subscribe(() => {
      const password = this.passwordFormControl.value

      this.strongPasswords.some((regex) => {
        if ((password?.match(regex)) && (password != '')) {
          this.passwordFormControl.setErrors({'strong': true })
          this.strengthLvl = 3
        }
      })

      this.mediumPasswords.some((regex) => {
        if ((password?.match(regex)) && (password != '')) {
          this.passwordFormControl.setErrors({'medium': true })
          this.strengthLvl = 2
        }
      })

      this.easyPasswords.some((regex) => {
        if ((password?.match(regex)) && (password != '')) {
          this.passwordFormControl.setErrors({'easy': true })
          this.strengthLvl = 1
        }
      })

      this.shortPasswords.some((regex) => {
        if (!(password?.match(regex)) && (password != '')) {
          this.passwordFormControl.setErrors({'short': true })
          this.strengthLvl = -1
        }
      })

      if (password == '') {
        this.strengthLvl = 0
      }    

    })
  }

  ngOnInit(): void {
  }


}
