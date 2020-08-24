import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule

  ],
  exports: [
    MatChipsModule,    
    MatFormFieldModule,
    MatIconModule

  ]
})
export class MaterialModule { }
