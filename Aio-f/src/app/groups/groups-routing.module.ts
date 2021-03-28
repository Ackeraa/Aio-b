import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';
import {
	ExploreComponent,
	MyGroupsComponent 
} from '.';

const routes: Routes = [
	{
		path: '', component: GroupsComponent,
		children: [
			{ path: '', redirectTo: 'problems', pathMatch: 'full' },
			{ path: 'my-groups', component: MyGroupsComponent },
			{ path: 'explore', component: ExploreComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GroupsRoutingModule { }
