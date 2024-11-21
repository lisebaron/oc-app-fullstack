import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { FeedComponent } from './pages/feed/feed.component';
import { TopicComponent } from './pages/topic/topic.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { HeaderComponent } from './components/header/header.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, RegisterComponent, GoBackComponent, FeedComponent, TopicComponent, ProfileComponent, PostDetailsComponent, HeaderComponent, PostCreateComponent, TopicCardComponent, PostCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
