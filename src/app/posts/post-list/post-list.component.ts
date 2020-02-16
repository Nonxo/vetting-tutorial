import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSub: Subscription;
  isLoading: boolean;
  totalPosts = 0;
  currentPage = 1;
  postPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.postSub = this.postsService.getPostUpdatedListener().subscribe((postsData) => {
      this.isLoading = false;
      this.totalPosts = postsData.postCount;
      this.posts = postsData.posts;

    });
  }

  onDelete(postId: string) {
    this.isLoading = true
    this.postsService.deletePost(postId).subscribe(result => {
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  onPageChange(event: PageEvent) {
    this.isLoading = true;
    this.postsService.getPosts(event.pageSize, event.pageIndex + 1);

  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

}
