import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemsComponent } from './problems.component';

import {
	CreateComponent,
	BetaComponent,
	UploadComponent,
	CollectionComponent
} from '.';

@NgModule({
	declarations: [
		CreateComponent,
		BetaComponent,
		UploadComponent,
		CollectionComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		FileUploadModule,
		ReactiveFormsModule,
		MarkdownModule.forChild(),
		ProblemsRoutingModule
	],
	exports: [
		CreateComponent,
		BetaComponent,
		UploadComponent,
		CollectionComponent
	],
})
export class ProblemsModule { }
