import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UppercaseDirective} from './changeUppercase.directive';
import {OnlyNumbersDirective} from './onlyNumbers.directive';
import {DebounceClickDirective} from './debounce-click.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UppercaseDirective,
    OnlyNumbersDirective,
    DebounceClickDirective
  ],
  exports: [
    UppercaseDirective,
    OnlyNumbersDirective,
    DebounceClickDirective
  ]
})
export class DirectivesModule { }
