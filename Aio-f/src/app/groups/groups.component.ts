import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const BASE_URL = 'http://127.0.0.1:3000'

@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {

	template: FileUploader;
	spj: FileUploader;
	data: FileUploader;
	template_response: string;
	spj_response: string;
	data_response: string;

	constructor (){
		this.template = new FileUploader({
			url: BASE_URL + '/problems/upload_template',
			itemAlias: 'template',
		});
		this.template.onBeforeUploadItem = (item) => {
			item.withCredentials = false;
		}

		this.spj = new FileUploader({
			url: BASE_URL + '/problems/upload_spj',
			itemAlias: 'spj',
		});
		this.spj.onBeforeUploadItem = (item) => {
			item.withCredentials = false;
		}

		this.data = new FileUploader({
			url: BASE_URL + '/problems/upload_data',
			itemAlias: 'data',
		});
		this.data.onBeforeUploadItem = (item) => {
			item.withCredentials = false;
		}

		this.template_response = '';
		this.template.response.subscribe( res => this.template_response = res );

		this.spj_response = '';
		this.spj.response.subscribe( res => this.spj_response = res );

		this.data_response = '';
		this.data.response.subscribe( res => this.data_response = res );
	}

	onTemplateChange() {
		if (this.template.queue.length != 1){
			this.template.removeFromQueue(this.template.queue[0]);
		}
	}
	onSpjChange() {
		if (this.spj.queue.length != 1){
			this.spj.removeFromQueue(this.spj.queue[0]);
		}
	}
	onDataChange() {
		if (this.data.queue.length != 1){
			this.data.removeFromQueue(this.data.queue[0]);
		}
	}

	onTemplateSubmit() {
	}

	onSpjSubmit() {
	}

	onDataSubmit() {
	}

	ngOnInit(): void {

	}
}
