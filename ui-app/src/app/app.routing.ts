import { Routes, RouterModule } from '@angular/router';

import { CommentBoxComponent } from './comment-box/comment-box.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes = [
{ path: '', component: LoginComponent },
{ path: 'comments', component: CommentBoxComponent },
{ path: '**', component: LoginComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);