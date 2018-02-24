import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Introduce tu usuario' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/home']);
  }

}
