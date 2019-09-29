import { Component, OnInit, Input, ViewChild, ElementRef, Self } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl,
  ValidatorFn, Validators, NG_VALIDATORS, NgControl
} from '@angular/forms';
@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.css']
})
export class GenericInputComponent implements OnInit, ControlValueAccessor {
  

  @ViewChild('input', {static: false}) input: ElementRef;
  disabled;

@Input() type = 'text';
@Input() isRequired: boolean = false;
@Input() pattern: string = null;
@Input() label: string = null;
@Input() placeholder: string = null;
@Input() errorMsg: string = null;
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
   }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  onChange(event) {}

  onTouched() {}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  //validate (c: AbstractControl)
}
