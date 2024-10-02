import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../../services/reservations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpacesService } from '../../services/spaces.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {

  reservationForm: FormGroup;
  space: any;
  errorMessage: string = '';
  reservation: any;
  isEditMode = false;
  reservationId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService,
    private snackBar: MatSnackBar,
    private SpacesService: SpacesService, 
    private route: ActivatedRoute ,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.reservationForm = this.fb.group({
      space_id: ['', Validators.required],
      event_name: ['', Validators.required],
      reservation_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('reservationId');
    const spaceId = this.route.snapshot.paramMap.get('spaceId');
    if (this.reservationId) {
      this.isEditMode = true;
      this.reservationsService.getReservationById(+this.reservationId).subscribe((data) => {
        this.reservation = data;
        this.reservationForm.patchValue({
          space_id: this.reservation.space_id,
          event_name: this.reservation.event_name,
          reservation_date: this.reservation.reservation_date,
          start_time: this.reservation.start_time,
          end_time: this.reservation.end_time
        });
        this.space = this.reservation.space;
      });
    } else if (spaceId) {
      this.isEditMode = false;
      this.SpacesService.getSpaceById(+spaceId).subscribe((data) => {
        this.space = data;
        this.reservationForm.patchValue({
          space_id: this.space.id,
          event_name: this.space.name
        });
      });
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {

      const formValue = this.reservationForm.value;
      const formattedStartTime = this.formatTime(formValue.start_time);
      const formattedEndTime = this.formatTime(formValue.end_time);
      const formattedDate = this.datePipe.transform(formValue.reservation_date, 'yyyy-MM-dd') || '';

      const reservationData = new FormData();
      reservationData.append('space_id', formValue.space_id);
      reservationData.append('event_name', formValue.event_name);
      reservationData.append('reservation_date', formattedDate);
      reservationData.append('start_time', formattedStartTime);
      reservationData.append('end_time', formattedEndTime);

      if (this.isEditMode) {
        if (this.reservationId !== null) {
          this.reservationsService.updateReservation(+this.reservationId, reservationData).subscribe({
            next: () => {
              this.snackBar.open('Reserva actualizada con éxito', 'Cerrar', { duration: 3000 });
              this.errorMessage = '';
              this.router.navigate(['/reservations']);
            },
            error: (err) => {
              if (err.status === 409) {
                this.errorMessage = 'El espacio ya está reservado en ese horario. Intenta con otro horario.';
                this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
              } else {
                this.errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';
                this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
              }
            }
          });
        }
      } else {
        this.reservationsService.createReservation(reservationData).subscribe({
          next: () => {
            this.snackBar.open('Reserva creada con éxito', 'Cerrar', { duration: 3000 });
            this.errorMessage = '';
            this.router.navigate(['/reservations']);
          },
          error: (err) => {
            if (err.status === 409) {
              this.errorMessage = 'El espacio ya está reservado en ese horario. Intenta con otro horario.';
              this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
            } else {
              this.errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';
              this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
            }
          }
        });
      }
    }
  }

  formatTime(time: string): string {
    const timeParts = time.split(':');
    return `${timeParts[0]}:${timeParts[1]}:00`;
  }
}
