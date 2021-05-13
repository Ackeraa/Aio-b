import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';
import { SearchModule } from '../_components/search/search.module';
import {
	MyInfoComponent,
	ExploreComponent,
	HomeComponent,
	ContestsComponent,
	ProblemsComponent, 
	GroupsComponent, 
	FriendsComponent, 
	SettingsComponent,
} from '.';

@NgModule({
	declarations: [
		MyInfoComponent,
		ExploreComponent,
		HomeComponent,
		ContestsComponent,
		ProblemsComponent,
		GroupsComponent,
		FriendsComponent,
		SettingsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		UsersRoutingModule,
		SearchModule,
		NgxPaginationModule,
	],
	exports: [
		MyInfoComponent,
		ExploreComponent,
	],
})
export class UsersModule { }
