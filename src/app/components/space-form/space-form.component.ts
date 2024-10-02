import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpacesService } from '../../services/spaces.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-space-form',
  templateUrl: './space-form.component.html',
  styleUrls: ['./space-form.component.css']
})
export class SpaceFormComponent {

  spaceForm: FormGroup;
  isEditMode = false;
  spaceId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private spacesService: SpacesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.spaceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      image_url: ['']
    });
  }

  ngOnInit(): void {
    this.spaceId = this.route.snapshot.paramMap.get('id');
    if (this.spaceId) {
      this.isEditMode = true;
      this.spacesService.getSpaceById(+this.spaceId).subscribe(space => {
        this.spaceForm.patchValue(space);
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.spaceForm.valid) {
      const formData = new FormData();
      formData.append('name', this.spaceForm.get('name')?.value);
      formData.append('description', this.spaceForm.get('description')?.value);
      formData.append('capacity', this.spaceForm.get('capacity')?.value);
      formData.append('type', this.spaceForm.get('type')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
  
      if (this.isEditMode) {
        if (this.spaceId !== null) {
          this.spacesService.updateSpace(+this.spaceId, formData).subscribe({
            next: () => {
              this.snackBar.open('Espacio actualizado con éxito', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/admin/spaces']);
            },
            error: () => {
              this.snackBar.open('Error al actualizar el espacio', 'Cerrar', { duration: 3000 });
            }
          });
        }
      } else {
        this.spacesService.createSpace(formData).subscribe({
          next: () => {
            this.snackBar.open('Espacio creado con éxito', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/admin/spaces']);
          },
          error: () => {
            this.snackBar.open('Error al crear el espacio', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }
}
