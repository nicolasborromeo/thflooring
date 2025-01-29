import ReactDom from 'react-dom'
import { createContext, useContext, useState } from 'react'

export const modalContext = createContext();

export function ModalProvider({children}) {
    const [modalContent, setModalContent] = useState(null)

    const closeModal = () => {
        setModalContent(null)
    };

    const contextValue = {closeModal, modalContent, setModalContent}

    return (
        <>
            <ModalProvider value={contextValue}>
                {children}
            </ModalProvider>
            <div id="modal-ref"/>
        </>

    )
}

export function Modal() {
    const {modalContent, closeModal} = useContext(modalContext);

    if (!modalContent) return null

    return ReactDom.createPortal(
        <div>
            <div id="overlay" />
            <div id="modal" >
                <button
                    onClick={closeModal}>
                        Close
                </button>
                {modalContent}
            </div>
        </div>,
        document.getElementById('modal-ref')
    )
}

export const useModal = () => useContext(modalContext)
