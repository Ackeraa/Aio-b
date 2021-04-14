import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-problem-submit',
	templateUrl: './submit.component.html',
	styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

	code: any;
	options: any;
	modes: Array<string>;
	languages: Array<string>;
	language: string; 
	themes: Array<string>;
	constructor() {
		this.options = {
			tabSize: 4,
			smartIndent: true,
			indentWithTabs: true,
			lineNumbers: true,
			lineWrapping: true,
			theme: 'dracula',
			mode: 'clike'
		}
		this.modes = ["clike", "clike", "javascript", "python"];
		this.languages = ["C", "C++", "Java", "Python"];
		this.themes = ["Dracula", "Eclipse", "Idea"]; 
	}

	selectLanguage(id: any): void {
		this.language = this.languages[id];
		this.options.mode = this.modes[id];
	}

	selectTheme(id: any): void {
		this.options.theme = this.themes[id].toLowerCase();
	}

	clearCode(): void {
		this.code = "";
	}

	loadCode(file: any): void {
		let reader = new FileReader();
		reader.onload = (fileLoadedEvent) => {
			this.code = fileLoadedEvent.target.result;
		};
		reader.readAsText(file, "UTF-8");
	}
	ngOnInit(): void {
	}

}
