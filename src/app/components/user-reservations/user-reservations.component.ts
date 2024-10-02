import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {

  reservations: any[] = [];

  constructor(private reservationsService: ReservationsService,  
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserReservations();
  }

  getUserReservations(): void {
    this.reservationsService.getUserReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar las reservas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  editReservation(reservation: any): void {
    this.router.navigate(['/reservations/edit', reservation.id]);
  }

  deleteReservation(id: number): void {
    this.reservationsService.deleteReservation(id).subscribe({
      next: () => {
        this.snackBar.open('Reserva cancelada exitosamente', 'Cerrar', { duration: 3000 });
        this.getUserReservations();
      },
      error: (err) => {
        this.snackBar.open('Error al cancelar la reserva', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
