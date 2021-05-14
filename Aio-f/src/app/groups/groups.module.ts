import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { GroupsRoutingModule } from './groups-routing.module';
import { SearchModule } from '../_components/search/search.module';
import {
	ExploreComponent,
	MyGroupsComponent,
} from '.';

@NgModule({
	declarations: [
		ExploreComponent,
		MyGroupsComponent,
	],
	imports: [
		CommonModule,
		GroupsRoutingModule,
		SearchModule,
		NgxPaginationModule
	],
	exports: [
		ExploreComponent,
		MyGroupsComponent
	]
})
export class GroupsModule { }
