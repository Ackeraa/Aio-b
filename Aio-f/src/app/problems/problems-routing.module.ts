import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemsComponent } from './problems.component';
import {
	SetsComponent,
	BetaComponent,
	CreateComponent,
	CollectionComponent
} from '.';

const routes: Routes = [
	{
		path: '',
		component: ProblemsComponent,
		children: [
			{ path: '', redirectTo: 'collection' },
			{ path: 'collection', component: CollectionComponent },
			{ path: 'sets', component: SetsComponent }, 
			{ path: 'beta', component: BetaComponent },
			{ path: 'create', component: CreateComponent },
		]
	},
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ProblemsRoutingModule {
}
