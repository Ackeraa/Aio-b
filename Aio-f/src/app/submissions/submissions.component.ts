import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';

@Component({
	selector: 'app-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	// Starts from 1.
	pages: number;
	page: number;
	per_page: number;
	@ViewChildren('pageClass') pageClass: any;

	constructor(private element: ElementRef) { }

	ngOnInit(): void {
		this.pages = 5;
		this.page = 1;
		this.per_page = 10;
	}

	previous(): void {
		if (this.page === 1) return;
		this.page -= 1;
	}

	next(): void {
		if (this.page === this.pages) return;
		this.page += 1;
	}

	addClass(id: number, cls: string): void {
		this.pageClass._results[id].nativeElement.classList.add(cls);
	}

	removeClass(id: number, cls: string): void {
		this.pageClass._results[id].nativeElement.classList.remove(cls);
	}

	setText(id: number, p: number): void {
		this.pageClass._results[id].nativeElement.children[0].textContent = p.toString();
	}

	setPage(id: number): void {
		this.pageClass._results
			.filter(x => x.nativeElement.classList.contains('active'))
			.map(x => x.nativeElement.classList.remove('active'));
		if (id == 0) {
			this.page = 1;
			this.addClass(0, 'active');
			this.addClass(1, 'hide');
			this.setText(2, 2);
			this.setText(3, 3);
			this.setText(4, 4);
		} else if (id == 2) {
			if (this.page < 4) {
				this.page = 2;
				this.addClass(2, 'active');
			} else if (this.page > this.pages - 3) {
				this.page -= 1;
				this.addClass(3, 'active');
				this.removeClass(5, 'hide');
				this.setText(2, this.page - 1);
				this.setText(3, this.page);
				this.setText(4, this.page + 1);
			} else {
				this.page -= 1;
				this.addClass(3, 'active');
				this.setText(2, this.page - 1);
				this.setText(3, this.page);
				this.setText(4, this.page + 1);
			}
		} else if (id == 3) {
			if (this.page < 4) {
				this.page = 3;
				this.addClass(3, 'active');
			} else if (this.page > this.pages - 3) {
				this.page = this.pages - 2;
				this.addClass(3, 'active');
			}
		} else if (id == 4) {
			if (this.page < 4) {
				this.page = 4;
				this.addClass(3, 'active');
				this.removeClass(1, 'hide');
				this.setText(2, 3);
				this.setText(3, 4);
				this.setText(4, 5);
			} else if (this.page < this.pages - 3) {
				this.page += 1;
				this.addClass(3, 'active');
				this.setText(2, this.page - 1);
				this.setText(3, this.page);
				this.setText(4, this.page + 1);
			} else {
				this.page = this.pages - 1;
				this.addClass(4, 'active');
				this.setText(2, this.page - 2);
				this.setText(3, this.page - 1);
			}
		} else if (id == 6) {
			this.page = this.pages;
			this.addClass(6, 'active');
			this.addClass(5, 'hide');
			this.removeClass(1, 'hide');
			this.setText(2, this.page - 3);
			this.setText(3, this.page - 2);
			this.setText(4, this.page - 1);
		}
	}
}
