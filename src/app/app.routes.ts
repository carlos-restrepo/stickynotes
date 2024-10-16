import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { appConfig } from './app.config';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:"full"},
    {path: 'home', component:AppComponent},
    {path: 'note', component:NoteComponent},
];
