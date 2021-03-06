import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-logiin',
  templateUrl: './logiin.component.html',
  styleUrls: ['./logiin.component.scss']
})
export class LogiinComponent implements OnInit {


  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthService) {
  }

  PatientForm: FormGroup;


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.PatientForm = this.fb.group({
      id: [''],
      password: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
    });
  }

  clikButton() {
    const controls = this.PatientForm.controls;

    /* Проверяем форму  */
    if (this.PatientForm.invalid) {
      /*Если форма не валидна, то помечаем все как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /* Прерываем выполнение метода*/
      return;
    }

    this.authenticationService.login(this.PatientForm.value).subscribe(data => {
      // @ts-ignore
      if (data === false) {
        this.router.navigate(['/user/lk']);
      } else {
        this.router.navigate(['/admin']);
      }
    });
    this.authenticationService.isLoggedIn = true;
  }
}

