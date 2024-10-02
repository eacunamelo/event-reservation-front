import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SpacesListComponent } from './components/spaces-list/spaces-list.component';
import { SpaceDetailComponent } from './components/space-detail/space-detail.component';
import { SpaceFormComponent } from './components/space-form/space-form.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { adminGuard, authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'spaces', component: SpacesListComponent },
  { path: 'space-details/:id', component: SpaceDetailComponent },
  { path: 'admin/spaces/new', component: SpaceFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/spaces/edit/:id', component: SpaceFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'reservations/new/:spaceId', component: ReservationFormComponent, canActivate: [authGuard] },
  { path: 'reservations/edit/:reservationId', component: ReservationFormComponent, canActivate: [authGuard] },
  { path: 'reservations', component: UserReservationsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/spaces', pathMatch: 'full' },
  { path: '**', redirectTo: '/spaces' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
