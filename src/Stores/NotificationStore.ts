import { makeObservable, action } from "mobx";
import { toast } from "react-toastify";

export class NotificationStore {

    constructor() {
        makeObservable(this, {
            notifySuccess: action,
            notifyWarning: action,
            notifyError: action,
        })
    }
    
    notifySuccess = (message: string) => toast.success(message, {
        position:'top-right',
        autoClose:1000,
        theme:'light',
        }
    );

    notifyWarning = (message: string) => toast.warn(message, {
        position:'top-right',
        autoClose:1000,
        theme:'light',
        }
    );

    notifyError = (message: string) => toast.error(message, {
        position:'top-right',
        autoClose:1000,
        theme:'dark',
        }
    );

    notifyInfo = (message: string) => toast.info(message, {
        position: 'top-right',
        autoClose: false,
        theme:'light',
        closeOnClick: true,
    })
}