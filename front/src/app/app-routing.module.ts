import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TopicComponent } from './pages/topic/topic.component';
import { FeedComponent } from './pages/feed/feed.component';
// import { PostDetailsComponent } from './pages/post-details/post-details.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'topics',
    component: TopicComponent
  },
  {
    path: 'feed',
    component: FeedComponent
  },
  // TODO post id details
  // {
  //   path: 'post/:id',
  //   component: PostDetailsComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
