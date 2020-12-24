import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ContestsComponent } from './contests';
import { ContestComponent } from './contest';
import { ProblemsComponent } from './problems';
import { ProblemComponent } from './problem';
import { SubmissionsComponent } from './submissions';
import { DiscussionComponent } from './discussion';
import { GroupsComponent } from './groups';
import { UsersComponent } from './users';
import { WikiComponent } from './wiki';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { fakeBackendProvider } from './_helpers';
import { AlertComponent } from './_components';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,

		FormsModule,
		HttpModule,
		LayoutModule,
		NgbModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
		ContestsComponent,
		SubmissionsComponent,
		ProblemsComponent,
		ProblemComponent,
		DiscussionComponent,
		GroupsComponent,
		UsersComponent,
		WikiComponent,
		ContestComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };