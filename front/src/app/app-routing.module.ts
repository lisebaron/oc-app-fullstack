import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TopicComponent } from './pages/topic/topic.component';
import { FeedComponent } from './pages/feed/feed.component';
import { AuthGuard } from './guards/auth.guard';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'feed',
    canActivate: [AuthGuard],
    component: FeedComponent
  },
  {
    path: 'topics',
    canActivate: [AuthGuard],
    component: TopicComponent
  },
  {
    path: 'post/:id',
    canActivate: [AuthGuard],
    component: PostDetailsComponent
  },
  {
    path: 'post-create',
    canActivate: [AuthGuard],
    component: PostCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
