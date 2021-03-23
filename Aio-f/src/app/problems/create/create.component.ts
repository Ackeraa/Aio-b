import { Component, OnInit, Renderer2 } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { Problem } from '../problem';
import { FormBuilder, FormGroup, FormArray, Validators,
		 AbstractControl, FormControl } from '@angular/forms';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

	form: FormGroup;
	name: AbstractControl;
	memory: AbstractControl;
	time: AbstractControl;
	description: AbstractControl;
	input: AbstractControl;
	output: AbstractControl;
	samples: FormArray;
	hint: AbstractControl;
	tags: Array<string>;
	selectedTags: Array<string>;
	rule: string;
	visible: boolean;
	languages: Array<string>;
	allowedLanguages: Array<string>;
	template: any;
	onSubmit(form?: any): void{ 
		console.log(form);
	}

	constructor(private fb: FormBuilder, private renderer: Renderer2) { 
		this.form = fb.group({
			name: ['', Validators.required],
			memory: ['', Validators.required],
			time: ['', Validators.required],
			description:  ['', Validators.required],
			input:  ['', Validators.required],
			output:  ['', Validators.required],
			samples: fb.array([this.createSample()]),
			hint:  ['', Validators.required],
			template: null
		});

		this.name = this.form.controls['name'];
		this.memory = this.form.controls['memory'];
		this.time = this.form.controls['time'];
		this.description = this.form.controls['description'];
		this.input = this.form.controls['input'];
		this.output = this.form.controls['output'];
		this.samples = this.form.get('samples') as FormArray;
		this.hint = this.form.controls['hint'];
		this.tags = ['DP', 'Greedy', 'DFS', 'BFS', 'Geometry', 'Brute Force'];
		this.selectedTags = [];
		this.rule = 'acm';
		this.visible = null;
		this.languages = ['C', 'Cpp', 'Java', 'Python'];
		this.allowedLanguages = ['C', 'Cpp', 'Java', 'Python'];
		this.template = this.form.controls['template'];
		this.samples.valueChanges.subscribe(
			(value: any) => {
				console.log('memory changed to: ', value);
			}
		);

	}
	//Sample
	createSample(): FormGroup {
		return this.fb.group({
			sampleInput: ['', Validators.required],
			sampleOutput: ['', Validators.required]
		});
	}
	addSample(): void {
		this.samples.push(this.createSample());
	}
	removeSample(i: number, sample: any): void {
		this.samples.removeAt(i);
		console.log(sample);
	}
	get sampleControls() {
		return this.form.get('samples')['controls'];
	}

	//Tag
	selectTag(btn: any, tag: string){
		console.log(btn.class);
		let index = this.selectedTags.indexOf(tag);
		if (index == -1){
			this.selectedTags.push(tag);
			this.renderer.removeClass(btn, 'btn-outline-dark');
			this.renderer.addClass(btn, 'btn-primary');
		} else {
			this.selectedTags.splice(index, 1);
			this.renderer.removeClass(btn, 'btn-primary');
			this.renderer.addClass(btn, 'btn-outline-dark');
		}
		console.log(this.selectedTags);
	}
	//Rule
	selectRule(rule: any) {
		this.rule = rule;
	}
	//Visible
	selectVisible(visible: boolean) {
		this.visible = visible;
	}

	//Language
	selectLan(check: boolean, lan: string) {
		if (check) {
			this.allowedLanguages.push(lan);
		} else {
			let index = this.allowedLanguages.indexOf(lan);
			this.allowedLanguages.splice(index, 1);
		}
	}
	ngOnInit(): void {

	}

}

function skuValidator(control: FormControl): { [s: string]: boolean } {
	if (!control.value.match(/^123/)) {
		return {invalidSku: true};
	}
}
