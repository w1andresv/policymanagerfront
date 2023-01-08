import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import {  InputSwitchModule } from 'primeng/inputswitch';

const modules = [
  CommonModule,
  ButtonModule,
  CheckboxModule,
  InputTextModule,
  FormsModule,
  PasswordModule,
  RippleModule,
  ReactiveFormsModule,
  TableModule,
  InputMaskModule,
  DropdownModule,
  FileUploadModule,
  InputSwitchModule
];

@NgModule( {
  imports: modules,
  exports: modules
} )
export class SharedModule {
}
