import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	ContestsComponent,
	CreateComponent
} from '.';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', component: ContestsComponent },
			{ path: 'create', component: CreateComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContestsRoutingModule { }
