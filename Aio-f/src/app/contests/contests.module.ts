import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContestsRoutingModule } from './contests-routing.module';
import {
	ContestsComponent,
	CreateComponent,
	RecentComponent,
	PastComponent 
} from '.';

@NgModule({
	declarations: [
		CreateComponent,
		RecentComponent,
		PastComponent
	],
	imports: [
		CommonModule,
		NgbModule,
		ContestsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
	]
})
export class ContestsModule { }
