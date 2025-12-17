import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-success',
  standalone: false,
  templateUrl: './btn-success.html',
  styleUrl: './btn-success.scss',
})
export class BtnSuccess {
  @Input() label: string = 'Success';
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
