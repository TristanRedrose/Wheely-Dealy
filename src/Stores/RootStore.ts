import { authStore, AuthStore } from "../Stores/AuthStore";
import { ModalStore, modalStore } from "../Stores/ModalStore";
import { listingStore, ListingStore } from "../Stores/ListingStore";

export class RootStore {
    listingStore: ListingStore;
    modalStore: ModalStore;
    authStore: AuthStore;
    
    constructor(listingStore: ListingStore, modalStore: ModalStore, authStore: AuthStore) {
        this.listingStore = listingStore;
        this.modalStore = modalStore;
        this.authStore = authStore;
    }
}

export const rootStore = new RootStore(listingStore, modalStore, authStore);