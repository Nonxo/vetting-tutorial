 import { Component, OnInit } from '@angular/core';
 import { Post } from '../posts.model';
 import {FormControl, FormGroup, Validators} from '@angular/forms';
 import { PostsService } from '../posts.service';
 import { ActivatedRoute } from '@angular/router';
 import {fileValidation} from './file-validator';

 @Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

   private mode = 'create';
   private postId: string;
   post: Post;
   form: FormGroup;
   isLoading: boolean;
   imagePreview: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [fileValidation]
      })
    });
    this.route.paramMap.subscribe((paramMap ) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((result: any) => {
          if (result.post) {
            this.isLoading = false;
            this.post = {id: result.post.id, title: result.post.title, content: result.post.content, imagePath: result.post.imagePath};
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath
            });
          }
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPosts(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
       );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();

  }

}
