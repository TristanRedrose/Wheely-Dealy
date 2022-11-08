import { makeObservable, observable, action } from "mobx";

export class ModalStore  {
    isActive: boolean = false;
    modalText: string = '';
    buttonText: string = '';
    listingId:string = '';

    constructor() {
        makeObservable(this, {
            isActive:observable,
            setIsActive: action,
            closeModal: action,
            modalText: observable,
            buttonText: observable,
            setButtonText: action,
            setModalText: action,
            toggleLoginModal: action,
            toggleDeleteModal: action,
            listingId:observable,
            setListingId: action,
        })
    }

    toggleLoginModal = () => {
        this.setModalText("Are you sure you want to log out?");
        this.setButtonText("Logout");
        this.setIsActive(true);
    }

    toggleDeleteModal = (id:string) => {
        this.setModalText("Are you sure you want to delete listing");
        this.setButtonText("Delete");
        this.setIsActive(true);
        this.setListingId(id);
    }

    setIsActive = (value: boolean): void => {
        this.isActive = value;
    }

    setModalText = (value: string): void => {
        this.modalText = value;
    }

    setButtonText = (value:string): void => {
        this.buttonText = value;
    }

    setListingId = (id:string): void => {
        this.listingId = id;
    }

    closeModal = (): void => {
        this.setIsActive(false);
        this.setModalText("");
        this.setButtonText("");
        this.setListingId('');
    }
}