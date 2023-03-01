import { makeAutoObservable } from "mobx";
export class UserStore {
  user;
  constructor() {
    makeAutoObservable(this);
  }

  addUser(user) {
    this.user = user;
  }
}
