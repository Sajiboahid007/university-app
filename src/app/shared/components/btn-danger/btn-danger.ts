import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-danger',
  standalone: false,
  templateUrl: './btn-danger.html',
  styleUrl: './btn-danger.scss',
})
export class BtnDanger {
  @Input() label: string = 'Delete';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
