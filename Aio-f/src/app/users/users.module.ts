import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';
import {
	MyInfoComponent,
	ExploreComponent 
} from '.';

@NgModule({
	declarations: [
		MyInfoComponent,
		ExploreComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		NgxPaginationModule
	],
	exports: [
		MyInfoComponent,
		ExploreComponent
	],
})
export class UsersModule { }
