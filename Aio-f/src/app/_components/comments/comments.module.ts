import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownModule} from 'ngx-markdown';
import { CommentsComponent } from './comments.component';

@NgModule({
	declarations: [
		CommentsComponent
	],
	imports: [
		CommonModule,
		MarkdownModule,
		FormsModule
	],
	exports: [
		CommentsComponent
	]
})
export class CommentsModule { }
