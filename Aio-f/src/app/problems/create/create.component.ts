import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ngx-markdown';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

	public description = '';
	public input = '';
	public output = '';
	public hint = '';
	public marked = '';
	public options: KatexOptions = {
	  displayMode: true,
	  throwOnError: false,
	  errorColor: '#cc0000',
	};

  public katexMarkdown =
`#### \`katex\` directive example


$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$`;
	constructor() { }

	ngOnInit(): void {
	}

}
