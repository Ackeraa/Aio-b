import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ContestRoutingModule } from './contest-routing.module';
import { ProblemsModule } from '../problems/problems.module';
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
		RanksComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		CodemirrorModule,
		ContestRoutingModule,
		ProblemsModule 
	],
	exports: [
	]
})
export class ContestModule { }
