import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SpacesService } from '../../services/spaces.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from 'src/app/auth/auth.service'; 

@Component({
  selector: 'app-spaces-list',
  templateUrl: './spaces-list.component.html',
  styleUrls: ['./spaces-list.component.css']
})
export class SpacesListComponent {

  spaces: any[] = [];
  searchParams = {
    type: '',
    capacity: '',
    date: ''
  };

  constructor(private spacesService: SpacesService, 
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadSpaces();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  loadSpaces(): void {
    this.spacesService.getSpaces().subscribe({
      next: (response) => {
        this.spaces = response;
      },
      error: (err) => {
        this.notificationService.showError('Error al cargar espacios');
      }
    });
  }

  viewSpaceDetails(space: any) {
    this.router.navigate(['/space-details', space.id]);
  }

  searchSpaces() {
    this.spacesService.getSpaces(this.searchParams.type, this.searchParams.capacity, this.searchParams.date)
      .subscribe({
        next: (response) => {
          this.spaces = response;
        },
        error: (err) => {
          this.notificationService.showError('Error al cargar espacios');
        }
      });
  }

  goToReservationForm(spaceId: number) {
    this.router.navigate(['/reservations/new', spaceId]);
  }

  goToEditSpace(spaceId: number): void {
    this.router.navigate(['/admin/spaces/edit', spaceId]);
  }

  goToCreateSpace(): void {
    this.router.navigate(['/admin/spaces/new']);
  }
}
