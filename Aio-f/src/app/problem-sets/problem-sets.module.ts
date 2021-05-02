import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemSetsRoutingModule } from './problem-sets-routing.module';
import {
	ProblemSetsComponent,
	CreateComponent,
	PrivateComponent,
	PublicComponent
} from '.';

@NgModule({
	declarations: [
		CreateComponent,
		PrivateComponent,
		PublicComponent
	],
	imports: [
		CommonModule,
		NgbModule,
		ProblemSetsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
	]
})
export class ProblemSetsModule { }
