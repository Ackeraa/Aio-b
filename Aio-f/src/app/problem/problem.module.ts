import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ProblemRoutingModule } from './problem-routing.module';
import {
	DescriptionComponent,
	DiscussionComponent,
	MySubmissionsComponent,
	SolutionsComponent,
	SubmissionsComponent,
	SubmitComponent
} from '.';

@NgModule({
	declarations: [
		DescriptionComponent,
		DiscussionComponent,
		MySubmissionsComponent,
		SolutionsComponent,
		SubmissionsComponent,
		SubmitComponent
	],
	imports: [
		CommonModule,
        HttpClientModule,
		ProblemRoutingModule,
		MarkdownModule.forChild(),
	],
	exports: [
		DescriptionComponent,
		DiscussionComponent,
		MySubmissionsComponent,
		SolutionsComponent,
		SubmissionsComponent,
		SubmitComponent
	]
})
export class ProblemModule { }
