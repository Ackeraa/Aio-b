import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemsComponent } from './problems.component';
import {
	LocalComponent,
	OnlineComponent, 
	SetsComponent,
	BetaComponent,
	CreateComponent,
} from '.';

const routes: Routes = [
	{
		path: '',
		component: ProblemsComponent,
		children: [
			{ path: '', redirectTo: 'local' },
			{ path: 'local', component: LocalComponent },
			{ path: 'online', component: OnlineComponent }, 
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
	static component = [
		ProblemsComponent, LocalComponent, OnlineComponent,
		SetsComponent, BetaComponent
	];
}
