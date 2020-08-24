import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appDecimalnumber]'
})
export class DecimalnumberDirective {
  constructor(
    private _el: ElementRef
  ) { }
  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    // new RegExp(/^\d*\.?\d{0,2}$/g);/[^0-9]*/g
    this._el.nativeElement.value = initalValue.replace(/[^0-9\.]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
