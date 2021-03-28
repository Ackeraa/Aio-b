import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContestRoutingModule } from './contest-routing.module';
import {
	MySubmissionsComponent,
	ProblemsComponent, 
	SubmissionsComponent,
	SubmitComponent, 
	RanksComponent
} from '.';


@NgModule({
	declarations: [
		ProblemsComponent,
		SubmitComponent,
		MySubmissionsComponent,
		SubmissionsComponent,
		RanksComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ContestRoutingModule
	],
	exports: [
		ProblemsComponent,
		SubmitComponent,
		MySubmissionsComponent,
		SubmissionsComponent,
		RanksComponent
	]
})
export class ContestModule { }
