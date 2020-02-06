 import {Component, OnInit} from '@angular/core';
 import {Post} from '../posts.model';
 import {NgForm} from '@angular/forms';
 import {PostsService} from '../posts.service';

 @Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm, id) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPosts(id, form.value.title, form.value.content);
    form.resetForm();
  }

}
