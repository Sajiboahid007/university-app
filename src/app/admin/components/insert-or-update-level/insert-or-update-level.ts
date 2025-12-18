import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Level } from '../../../shared/entity-model/unit';
import { MatDialogRef } from '@angular/material/dialog';
import { LevelService } from '../../services/level-service';

@Component({
  selector: 'app-insert-or-update-level',
  standalone: false,
  templateUrl: './insert-or-update-level.html',
  styleUrl: './insert-or-update-level.scss',
})
export class InsertOrUpdateLevel implements OnInit {
  levelForm!: FormGroup;
  level: Level | null = null;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<InsertOrUpdateLevel>,
    private readonly levelService: LevelService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.levelForm = this.levelService.createForm();
    this.levelForm.markAllAsTouched();
  }

  onDiscard(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const level = this.levelForm.getRawValue();
    console.log(level);
    this.dialogRef.close();
  }
}
