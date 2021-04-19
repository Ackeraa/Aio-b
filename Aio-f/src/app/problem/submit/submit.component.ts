import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';

@Component({
	selector: 'app-problem-submit',
	templateUrl: './submit.component.html',
	styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

	code: any;
	has_code: boolean;
	options: any;
	modes: Array<string>;
	languages: Array<any>;
	language: string; 
	themes: Array<string>;
	problem: any;

	constructor(private problemService: ProblemService) {
	}

	ngOnInit(): void {
		this.problemService.problem$.subscribe(problem => {
			if (problem != null && problem.source === 'codeforces') {
				this.languages = [
					{ id: 43, name: 'GNU GCC C11 5.1.0' },
					{ id: 42, name: 'GNU G++11 5.1.0' },
					{ id: 60, name: 'Java 11.0.6' },
					{ id: 31, name: 'Python 3.9.1' }
				];
			}
		});

		this.has_code = true;
		this.options = {
			tabSize: 4,
			smartIndent: true,
			indentWithTabs: true,
			lineNumbers: true,
			lineWrapping: true,
			theme: 'dracula',
			mode: 'clike'
		}
		this.modes = ['clike', 'clike', 'javascript', 'python'];
		this.themes = ['Dracula', 'Eclipse', 'Idea']; 
		this.code = '';
	}

	submit(): void {
		if (this.code == '') {
			this.has_code = false;
		} else {
			this.has_code = true;
			this.problemService.submitProblem(this.language, this.code);
		}
	}
	selectLanguage(id: any): void {
		this.language = this.languages[id];
		this.options.mode = this.modes[id];
	}

	selectTheme(id: any): void {
		this.options.theme = this.themes[id].toLowerCase();
	}

	clearCode(): void {
		this.code = '';
	}

	loadCode(file: any): void {
		let reader = new FileReader();
		reader.onload = (fileLoadedEvent) => {
			this.code = fileLoadedEvent.target.result;
		};
		reader.readAsText(file, 'UTF-8');
	}
}
