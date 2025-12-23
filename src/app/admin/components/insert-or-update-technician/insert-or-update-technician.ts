import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TechniciansService } from '../../services/technicians-service';

@Component({
  selector: 'app-insert-or-update-technician',
  standalone: false,
  templateUrl: './insert-or-update-technician.html',
  styleUrl: './insert-or-update-technician.scss',
})
export class InsertOrUpdateTechnician implements OnInit {
  isEditMode = false;
  isLoading = false;
  techForm!: FormGroup;

  constructor(private readonly techService: TechniciansService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.techForm = this.techService.createForm();
    this.techForm.markAllAsTouched;
  }

  onSave() {}
  onDiscard() {}
}
