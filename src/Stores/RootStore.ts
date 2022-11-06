import { SessionStore } from "./SessionStore/SessionStore";
import { AuthStore } from "./SessionStore/AuthStore";
import { ModalStore } from "../Stores/ModalStore";
import { ListingFormStore} from "./ListingStore/ListingFormStore";
import { ListingOperationsStore} from "./ListingStore/ListingOperationsStore";
import { ListingsPageStore } from "./ListingStore/ListingsPageStore";
import { ListingDetailsStore } from "./ListingStore/ListingDetailsStore";

export class RootStore {
    listingFormStore: ListingFormStore;
    modalStore: ModalStore;
    sessionStore: SessionStore;
    listingsPageStore: ListingsPageStore;
    listingDetailsStore: ListingDetailsStore;
    listingOperationsStore: ListingOperationsStore;
    
    constructor(
        listingsPageStore: ListingsPageStore,
        listingDetailsStore: ListingDetailsStore,
        listingOperationsStore: ListingOperationsStore,
        listingFormStore:ListingFormStore,
        modalStore: ModalStore,
        sessionStore: SessionStore,
        ) {
            this.listingsPageStore = listingsPageStore;
            this.listingDetailsStore = listingDetailsStore;
            this.listingOperationsStore = listingOperationsStore
            this.listingFormStore = listingFormStore;
            this.modalStore = modalStore;
            this.sessionStore = sessionStore;
    }
}

export const rootStore = new RootStore(
            new ListingsPageStore(),
            new ListingDetailsStore(),
            new ListingOperationsStore(),
            new ListingFormStore(),
            new ModalStore(),
            new SessionStore(new AuthStore())
        );