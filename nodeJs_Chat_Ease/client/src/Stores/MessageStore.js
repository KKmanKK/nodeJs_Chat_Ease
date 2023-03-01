import { makeAutoObservable, toJS } from "mobx";

export class MessageStore {
  constructor() {
    makeAutoObservable(this);
  }
  messages = [];

  addMessage(mess) {
    this.messages = [...this.messages, mess];
  }
}
