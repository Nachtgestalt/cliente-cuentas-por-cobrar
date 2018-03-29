import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-asignar-folios-empleado',
  templateUrl: './asignar-folios-empleado.component.html',
  styleUrls: ['./asignar-folios-empleado.component.css']
})
export class AsignarFoliosEmpleadoComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  vendedores = [
    {value: 'juan', viewValue: 'Juan'},
    {value: 'pedro', viewValue: 'Pedro'},
    {value: 'maria', viewValue: 'Maria'}
  ];


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
