import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
		UsersRoutingModule
	],
	exports: [
		MyInfoComponent,
		ExploreComponent
	],
})
export class UsersModule { }
