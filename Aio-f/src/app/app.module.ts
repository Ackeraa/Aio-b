import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule} from 'ngx-markdown';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProblemSearchModule } from './_components';
import { SearchModule } from './_components';
import { CommentsModule } from './_components';
import { SubmissionsModule } from './_components';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ContestsComponent } from './contests';
import { ContestComponent } from './contest';
import { ProblemsComponent } from './problems';
import { ProblemComponent } from './problem';
import { ProblemSetsComponent } from './problem-sets';
import { ProblemSetComponent } from './problem-set';
import { SubmissionsComponent } from './submissions';
import { DiscussionComponent } from './discussion';
import { GroupsComponent } from './groups';
import { UsersComponent } from './users';
import { WikiComponent } from './wiki';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { fakeBackendProvider } from './_helpers';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from "./_services/auth.service";
import { ActionCableService } from 'angular2-actioncable';

import {
	AlertComponent,
	HeaderComponent,
	FooterComponent 
} from './_components';

@NgModule({
    imports: [
		MarkdownModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
		FileUploadModule,
        AppRoutingModule,
		NgxPaginationModule,
		ProblemSearchModule,
		SearchModule,
		CommentsModule,
		SubmissionsModule,

		FormsModule,
		HttpModule,
		NgbModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
		ContestsComponent,
		SubmissionsComponent,
		ProblemsComponent,
		ProblemComponent,
		GroupsComponent,
		UsersComponent,
		WikiComponent,
		ContestComponent,
        AlertComponent,
		HeaderComponent,
		FooterComponent,
		ProblemSetsComponent,
		ProblemSetComponent,
		DiscussionComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

		Angular2TokenService,
		AuthService,
		ActionCableService 
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
