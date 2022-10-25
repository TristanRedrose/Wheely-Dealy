import { makeObservable, observable, action } from "mobx";

export class ModalStore  {
    isActive: boolean = false;

    constructor() {
        makeObservable(this, {
            isActive:observable,
            toggleModal: action,
        })
    }

    toggleModal = (): void => {
        this.isActive = !this.isActive;
    }
}

export const modalStore = new ModalStore();