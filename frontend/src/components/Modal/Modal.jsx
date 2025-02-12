import "./modal.css"
import ReactDom from 'react-dom'
import { createContext, useContext, useState } from 'react'

const ModalContext = createContext();

export function ModalProvider({children}) {
    const [modalContent, setModalContent] = useState(null)

    const closeModal = () => {
        setModalContent(null)
    };

    const contextValue = {closeModal, modalContent, setModalContent}

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
        </>

    )
}

export function Modal() {
    const {modalContent, closeModal} = useContext(ModalContext);

    if (!modalContent) return null

    return ReactDom.createPortal(
        <div>
            <div id="overlay" onClick={closeModal}/>
            <div id="modal" >
                <div id="modal-content">
                {modalContent}
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export const useModal = () => useContext(ModalContext)
