import { authStore, AuthStore } from "../Stores/AuthStore";
import { ModalStore, modalStore } from "../Stores/ModalStore";
import { listingStore, ListingStore } from "../Stores/ListingStore";
import { ListingFormStore, listingFormStore } from "./ListingFormStore";

export class RootStore {
    listingStore: ListingStore;
    listingFormStore: ListingFormStore
    modalStore: ModalStore;
    authStore: AuthStore;
    
    constructor(listingStore: ListingStore, listingFormStore:ListingFormStore, modalStore: ModalStore, authStore: AuthStore,) {
        this.listingStore = listingStore;
        this.listingFormStore = listingFormStore;
        this.modalStore = modalStore;
        this.authStore = authStore;
    }
}

export const rootStore = new RootStore(listingStore, listingFormStore, modalStore, authStore);