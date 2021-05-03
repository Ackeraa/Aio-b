import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemSetsRoutingModule } from './problem-sets-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
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
		ProblemSetsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPaginationModule
	],
	exports: [
	]
})
export class ProblemSetsModule { }
