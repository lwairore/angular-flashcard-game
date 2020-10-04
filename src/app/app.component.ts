import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IFlash } from './flash.model';
import { FlashService } from './flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', { static: true }) flashForm: NgForm;

  flashs: IFlash[];
  editing = false;
  editingId: number;

  constructor(private flashService: FlashService) {
    this.flashs = this.flashService.flashs;
    this.flash = {
      question: '',
      answer: '',
      show: null,
      id: null,
      remembered: null
    }
  }

  trackByFlashId(index, flash) {
    return flash.id;
  };

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }

  flash: { question, answer, show: boolean, id: number, remembered?: 'correct' | 'incorrect' };

  handleEdit(id: number) {
    this.flash = this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
  }

  handleRememberedChange({ id, flag }) {
    this.flashService.rememberedChange(id, flag);
  };

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  };

  handleClear() {
    this.flash = {
      question: '',
      answer: '',
      show: null,
      id: null,
      remembered: null
    };
    this.flashForm.reset();
  };

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  };

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

}
