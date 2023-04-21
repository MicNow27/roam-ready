import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() destructive: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() affirm = new EventEmitter<void>();

  onAffirm() {
    this.affirm.emit();
  }

  onCancel() {
    this.close.emit();
  }
}
