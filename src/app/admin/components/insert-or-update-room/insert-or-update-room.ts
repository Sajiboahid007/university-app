import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoomService } from '../../services/room-service';
import { UnitService } from '../../services/unit-service';
import { Unit } from '../../../shared/entity-model/unit';

@Component({
  selector: 'app-insert-or-update-room',
  standalone: false,
  templateUrl: './insert-or-update-room.html',
  styleUrl: './insert-or-update-room.scss',
})
export class InsertOrUpdateRoom implements OnInit {
  roomForm!: FormGroup;
  isEditMode = false;
  units: Unit[] = [];

  constructor(
    private readonly roomService: RoomService,
    private readonly unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUnits();
  }

  private initializeForm(): void {
    this.roomForm = this.roomService.creatFrom();
    this.roomForm.markAllAsTouched();
  }

  getUnits(): void {
    this.unitService.getUnits().subscribe({
      next: (res) => {
        this.units = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
