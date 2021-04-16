import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContestsComponent } from './contests.component';
import { ContestsRoutingModule } from './contests-routing.module';
import { CreateComponent } from './create/create.component';

@NgModule({
	declarations: [
		CreateComponent
	],
	imports: [
		CommonModule,
		NgbModule,
		ContestsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		CreateComponent
	]
})
export class ContestsModule { }