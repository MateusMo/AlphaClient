import { Component, EventEmitter, Output, Input, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements AfterViewInit {
  @Output() okClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();
  
  @Input() showOkButton = true;
  @Input() showCancelButton = true;
  
  private modalElement!: HTMLElement;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.modalElement = this.elementRef.nativeElement.querySelector('#confirmationModal');
  }

  open() {
    this.modalElement.classList.add('show');
    this.modalElement.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  close() {
    this.modalElement.classList.remove('show');
    this.modalElement.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  onOkClick() {
    this.okClicked.emit();
    this.close();
  }

  onCancelClick() {
    this.cancelClicked.emit();
    this.close();
  }
}
