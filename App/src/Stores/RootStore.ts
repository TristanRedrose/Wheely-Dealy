import { SessionStore } from "./SessionStore/SessionStore";
import { AuthStore } from "./SessionStore/AuthStore";
import { ModalStore } from "../Stores/ModalStore";
import { ListingFormStore} from "./ListingStore/ListingFormStore";
import { ListingOperationsStore} from "./ListingStore/ListingOperationsStore";
import { ListingsPageStore } from "./ListingStore/ListingsPageStore";
import { ListingDetailsStore } from "./ListingStore/ListingDetailsStore";
import { NotificationStore } from "./NotificationStore";

export class RootStore {
    listingFormStore: ListingFormStore;

    modalStore: ModalStore;

    sessionStore: SessionStore;

    listingsPageStore: ListingsPageStore;

    listingDetailsStore: ListingDetailsStore;

    listingOperationsStore: ListingOperationsStore;
    
    notificationStore: NotificationStore;

    constructor(
        ) {
            this.notificationStore = new NotificationStore();

            this.listingsPageStore = new ListingsPageStore();

            this.listingDetailsStore = new ListingDetailsStore();

            this.listingOperationsStore = new ListingOperationsStore(this.notificationStore);

            this.listingFormStore = new ListingFormStore();

            this.modalStore = new ModalStore();

            this.sessionStore = new SessionStore(new AuthStore(), this.notificationStore);
    }
}

export const rootStore = new RootStore();