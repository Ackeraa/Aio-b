import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ngx-markdown';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

	public marked = `#### \`katex\` directive example

	\`\`\`latex
	f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi
	\`\`\`

	$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$`;

	public options: KatexOptions = {
	  displayMode: true,
	  throwOnError: false,
	  errorColor: '#cc0000',
	};

	constructor() { }

	ngOnInit(): void {
	}

}
