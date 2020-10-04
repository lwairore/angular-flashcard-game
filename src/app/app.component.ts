import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IFlash } from './flash.model';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', { static: true }) flashForm: NgForm;

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];
  editing = false;
  editingId: number;

  constructor() {
    this.flash = {
      question: '',
      answer: ''
    }
  }

  trackByFlashId(index, flash) {
    return flash.id;
  };

  handleToggleCard(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.show = !flash.show;
  }

  handleDelete(id: number) {
    const flashId = this.flashs.indexOf(
      this.flashs.find(flash => flash.id === id));
    this.flashs.splice(flashId, 1);
   
      
  }

  flash: {question, answer};

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    // TODO: We will add editing logic after adding the form
  }

  handleRememberedChange({id, flag}) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.remembered = flag;
  };

  handleSubmit(): void {
    this.flashs.push({
      id: getRandomNumber(),
      ...this.flash,
      show: false
    });
  };

  handleClear() {
    this.flash = {
      question: '',
      answer: ''
    };
    this.flashForm.reset();
  }
  
}
