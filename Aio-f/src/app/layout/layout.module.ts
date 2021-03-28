import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		NgbDropdownModule
	],
	exports:[
		HeaderComponent,
		FooterComponent
	]
})
export class LayoutModule { }
