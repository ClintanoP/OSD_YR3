import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent{
  @Input() errorMessage?: string;
  @Output() onClose = new EventEmitter<void>();

  public isVisible = false;
  close() {
    this.isVisible = false;
    this.onClose.emit();
  }
}
