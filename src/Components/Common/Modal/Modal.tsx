import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { useModalStore } from "../../../Context/ModalContext";
import "./Modal.css";
import { observer } from "mobx-react-lite";


const Modal: React.FC<PropsWithChildren> = observer(({children}) => {

    const {isActive, toggleModal} = useModalStore();

    return ReactDOM.createPortal(
        <div className={!isActive ? "modal" : "modal-on"}>
            <div className="modal-overlay" onClick={() => toggleModal()}/>
            <div className="modal-box">
                {children}
            </div>
        </div>,
        document.getElementById('portal') as HTMLElement
    )
})

export default Modal;