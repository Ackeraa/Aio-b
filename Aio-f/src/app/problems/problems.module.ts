import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemsComponent } from './problems.component';

import {
	CreateComponent,
} from '.';

@NgModule({
	declarations: [
		CreateComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		MarkdownModule.forChild(),
		ProblemsRoutingModule
	],
	exports: [
		CreateComponent,
	]
})
export class ProblemsModule { }
