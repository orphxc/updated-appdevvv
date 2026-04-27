import { Routes } from '@angular/router';
import { SessionListComponent } from './components/session-list.component';
import { SessionFormComponent } from './components/session-form.component';

export const routes: Routes = [
  { path: '', component: SessionListComponent },
  { path: 'add', component: SessionFormComponent }
];