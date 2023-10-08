import { keyframes } from '@angular/animations';
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

  AllRegEx = {
    easyPasswords: {
      regex: [
        RegExp(/^[A-Za-zа-яА-Я]*$/gm),
        RegExp(/^[0-9]*$/gm),
        RegExp(/^[$&+,:`;=?@#|\\/\[|\]'<>.^*()%!_-]*$/gm)],
      lvl: 1
    },
    mediumPasswords: {
      regex: [
        RegExp(/^[A-Za-zа-яА-Я$&+,:`;=?@#|\\/\[|\]'<>.^*()%!_-]*$/gm),
        RegExp(/^[0-9$&+,:`;=?@#|\\/\[|\]'<>.^*()%!_-]*$/gm),
        RegExp(/^[A-Za-z0-9а-яА-Я]*$/gm)],
      lvl: 2
    },
    strongPasswords: { 
      regex: [RegExp(/^[A-Za-z0-9а-яА-Я$&+,:`;=?@#|\\/\[|\]'<>.^*()%!_-]*$/gm)], 
      lvl: 3 
    },
    shortPasswords:{ 
      regex:[RegExp(/^.{8,}$/)],
      lvl: -1
    }
  }

  constructor() {
    this.passwordFormControl.valueChanges.subscribe(() => {
      const password = this.passwordFormControl.value

      this.AllRegEx.strongPasswords.regex.some((pattern) => {
        if ((password?.match(pattern)) && (password != '')) {
          this.passwordFormControl.setErrors({ 'strong': true })
          this.strengthLvl = this.AllRegEx.strongPasswords.lvl
        } else if (password != '') {
          this.passwordFormControl.setErrors({ 'spaces': true })
          this.strengthLvl = this.AllRegEx.shortPasswords.lvl
        }
      })

      this.AllRegEx.mediumPasswords.regex.some((pattern) => {
        if ((password?.match(pattern)) && (password != '')) {
          this.passwordFormControl.setErrors({ 'medium': true })
          this.strengthLvl = this.AllRegEx.mediumPasswords.lvl
        }
      })

      this.AllRegEx.easyPasswords.regex.some((pattern) => {
        if ((password?.match(pattern)) && (password != '')) {
          this.passwordFormControl.setErrors({ 'easy': true })
          this.strengthLvl = this.AllRegEx.easyPasswords.lvl
        }
      })

      this.AllRegEx.shortPasswords.regex.some((pattern) => {
        if (!(password?.match(pattern)) && (password != '')) {
          this.passwordFormControl.setErrors({ 'short': true })
          this.strengthLvl = this.AllRegEx.shortPasswords.lvl
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
