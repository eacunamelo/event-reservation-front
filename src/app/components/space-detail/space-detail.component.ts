import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-space-detail',
  templateUrl: './space-detail.component.html',
  styleUrls: ['./space-detail.component.css']
})
export class SpaceDetailComponent {

  space: any;

  constructor(
    private route: ActivatedRoute,
    private spacesService: SpacesService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getSpaceDetails(+id);
    }
  }

  getSpaceDetails(id: number): void {
    this.spacesService.getSpaceById(id).subscribe({
      next: (response) => {
        this.space = response;
      },
      error: () => {
        this.notificationService.showError('Error al cargar los detalles del espacio');
      }
    });
  }
}
