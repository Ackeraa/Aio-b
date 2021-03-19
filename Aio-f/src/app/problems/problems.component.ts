import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-problems',
	templateUrl: './problems.component.html',
	styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

  katexMarkdown =
`#### \`katex\` directive example

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$`;
	constructor() { }

	ngOnInit(): void {
	}

}
