import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProblemRoutingModule } from './problem-routing.module';

@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
        BrowserModule,
        HttpClientModule,
		ProblemRoutingModule
	]
})
export class ProblemModule { }
