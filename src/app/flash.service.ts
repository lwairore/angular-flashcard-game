import { Injectable } from '@angular/core';

import { IFlash } from './flash.model';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000)
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
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
  flash: { question; answer; };

  constructor() {
    this.flash = {
      question: '',
      answer: '',

    }
  }

  addFlash(flash: IFlash) {
    this.flashs.push({
      ...flash,
      show: false,
      id: getRandomNumber(),
    });
  }

  toggleFlash(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.show = !flash.show;
  }

  deleteFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(index, 1);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect') {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.remembered = flag;
  }

  updateFlash(id, updatedFlash: IFlash) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.question = updatedFlash.question;
    flash.answer = updatedFlash.answer;
  }

  getFlash(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    return flash;
  }
}
