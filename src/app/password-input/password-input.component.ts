import { Component, OnInit, ViewChild, ElementRef, Self } from '@angular/core';
import { NgControl, Validators, ControlValueAccessor, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit, ControlValueAccessor {
 
@ViewChild('password', {static: false}) password: ElementRef;
disabled;

  constructor(@Self() public controlDir: NgControl) { }

  ngOnInit() {
    this.controlDir.valueAccessor = this;

    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
    validators.push(Validators.required);

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  onChange(event) { }

  onTouched() { }

  writeValue(obj: any): void {
    this.password.nativeElement.value = obj;
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
  
}
