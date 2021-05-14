import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	GroupComponent,
	HomeComponent,
	ContestsComponent,
	ProblemSetsComponent,
	MembersComponent,
	SettingsComponent 
} from '.';

@NgModule({
	declarations: [
		GroupComponent,
		HomeComponent,
		ContestsComponent,
		ProblemSetsComponent,
		MembersComponent,
		SettingsComponent
	],
	imports: [
		CommonModule
	]
})
export class GroupModule { }
