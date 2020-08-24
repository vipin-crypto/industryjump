import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCharacterOnly]'
})
export class CharacterOnlyDirective {

  constructor(
    private _el: ElementRef
  ) { }
  @Input() CharacterOnly: boolean = false;
  @Input() isUserName: boolean = false;
  @HostListener('input', ['$event']) onInputChange(event) {
    let exp = /[^a-zA-Z_/s]*/g;
    if (this.isUserName) exp = /[^a-z0-9_]*/g
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(exp, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
