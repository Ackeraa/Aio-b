import { Component, OnInit } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { DiscussionService } from './discussion.service';

interface Tree {
	root: TreeNode;
}
 
interface TreeNode {
	label: string;
	children: TreeNode[];
}

@Component({
	selector: 'app-discussion',
	templateUrl: './discussion.component.html',
	styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

	public data: Tree;
	public selectedTreeNode: TreeNode | null;
	description: string;
	comments: any;

	constructor( private discussionService: DiscussionService) {
		this.selectedTreeNode = null;
		this.data = {
			root: {
				label: "first",
				children: [
					{
						label: "second-a",
						children: [
							{
								label: "third-first",
								children: [
									{
										label: "ferth",
										children: [
											{
												label: "fiver",
												children: []
											}
										]
									}
								]
							}
						]
					},
					{
						label: "second-b",
						children: [
							{
								label: "third",
								children: []
							}
						]
					}
				]
			}
		}
		console.log(this.data.root);
	}

	public selectNode( node: TreeNode ) : void {
 
		this.selectedTreeNode = node;
 
		/*
		console.group( "Selected Tree Node" );
		console.log( "Label:", node.label );
		console.log( "Children:", node.children.length );
		console.groupEnd();
		*/
 
	}
	ngOnInit(): void {
		this.discussionService.getComments()
		.subscribe(comments => {
			this.comments = comments[0];
			console.log(this.comments);
		});
	}

}
