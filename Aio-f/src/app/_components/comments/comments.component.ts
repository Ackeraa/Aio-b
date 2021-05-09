import { Component, OnInit, Input } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { map, filter } from 'rxjs/operators'; 
import { CommentsService } from './comments.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

	@Input() which: string;
	descriptions: any;
	comments: any;
	user: any;

	constructor(private authService: AuthService,
				private commentsService: CommentsService) {
	}

	ngOnInit(): void {
		this.descriptions = {};
		this.authService.signedIn$
			.pipe(filter(x => x != null))
		    .subscribe(user => this.user = user);
		this.commentsService.getComments()
			.subscribe(comments => this.comments = comments);
	}

	setVisible(comment: any): void {
		//set visibility of the children of comment.
		comment.is_visible = !comment.is_visible;
	}
	
	initDescription(id: number): void {
		this.descriptions[id] = "";	
	}

	voteUp(comment: any): void {
		if (comment.likes.voters.indexOf(this.user.user_id) == -1) {
			comment.likes.votes++;
			comment.likes.voters.push(this.user.user_id);
			let index = comment.dislikes.voters.indexOf(1);
			if (index != -1) {
				comment.dislikes.votes--;
				comment.dislikes.voters.splice(index, 1);
			}
		}
	}

	voteDown(comment: any): void {
		if (comment.dislikes.voters.indexOf(this.user.user_id) == -1) {
			comment.dislikes.votes++;
			comment.dislikes.voters.push(1);
			let index = comment.likes.voters.indexOf(this.user.user_id);
			if (index != -1) {
				comment.likes.votes--;
				comment.likes.voters.splice(index, 1);
			}
		}
	}

	addComment(): void {
		this.comments.push({
			comment: { 
				creator: this.user.user_name,
				description: this.descriptions[0]
			},
			children: []
		});
		this.commentsService.create(0, this.descriptions[0]);
	}

	reply(node: any): void {
		node.comment.is_visible = true;
		node.children.push({
			comment: { 
				creator: this.user.user_name,
				description: this.descriptions[node.comment.id]
			},
			children: []
		});
		this.commentsService.create(node.comment.id, this.descriptions[node.comment.id]);
	}

}
