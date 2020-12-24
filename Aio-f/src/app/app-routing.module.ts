import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ContestsComponent } from './contests';
import { ContestComponent } from './contest';
import { ProblemsComponent } from './problems';
import { SubmissionsComponent } from './submissions';
import { DiscussionComponent } from './discussion';
import { GroupsComponent } from './groups';
import { UsersComponent } from './users';
import { WikiComponent } from './wiki';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProblemComponent } from './problem';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'contests', component: ContestsComponent },
	{ path: 'contest', component: ContestComponent },
	{
		path: 'problems',
		data: { preload: true },
		loadChildren: () => import('./problems/problems.module').then(m => m.ProblemsModule)
	},
	{
		path: 'problem',
		data: {preload: true },
		loadChildren: () => import('./problem/problem.module').then(m => m.ProblemModule)
	},
	{ path: 'submissions', component: SubmissionsComponent },
	{ path: 'discussion', component: DiscussionComponent },
	{ path: 'groups', component: GroupsComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
    //{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
