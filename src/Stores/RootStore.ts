import { authStore, AuthStore } from "../Stores/AuthStore";
import { ModalStore, modalStore } from "../Stores/ModalStore";
import { ListingFormStore, listingFormStore } from "./ListingStore/ListingFormStore";
import { AddListingStore, addListingStore } from "./ListingStore/AddListingStore";
import { UpdateListingStore, updateListingStore } from "./ListingStore/UpdateListingStore";
import { DeleteListingStore, deleteListingStore } from "./ListingStore/DeleteListingStore";
import { ListingsPageStore, listingsPageStore } from "./ListingStore/ListingsPageStore";
import { ListingDetailsStore, listingDetailsStore } from "./ListingStore/ListingDetailsStore";

export class RootStore {
    listingFormStore: ListingFormStore;
    modalStore: ModalStore;
    authStore: AuthStore;
    addListingStore: AddListingStore;
    updateListingStore: UpdateListingStore;
    deleteListingStore: DeleteListingStore;
    listingsPageStore: ListingsPageStore;
    listingDetailsStore: ListingDetailsStore;
    
    constructor(
        addListingStore:AddListingStore,
        updateListingStore:UpdateListingStore,
        deleteListingStore: DeleteListingStore,
        listingsPageStore: ListingsPageStore,
        listingDetailsStore: ListingDetailsStore,
        listingFormStore:ListingFormStore,
        modalStore: ModalStore,
        authStore: AuthStore,
        ) {
            this.addListingStore = addListingStore;
            this.updateListingStore = updateListingStore;
            this.deleteListingStore = deleteListingStore;
            this.listingsPageStore = listingsPageStore;
            this.listingDetailsStore = listingDetailsStore;
            this.listingFormStore = listingFormStore;
            this.modalStore = modalStore;
            this.authStore = authStore;
    }
}

export const rootStore = new RootStore(
            addListingStore,
            updateListingStore,
            deleteListingStore,
            listingsPageStore,
            listingDetailsStore,
            listingFormStore,
            modalStore,
            authStore
        );