import React from 'react';
import styles from './modal.module.css'

const Modal = ({ id = 'modal', onClose, children}) => {

    const handleOutsideClick = (e) => {
        onClose()
    }

    return ( 
        <div 
            className={styles.modalContainer} 
            onClick={handleOutsideClick}>
            <div 
                id={id} 
                className={styles.modal}
                onClick={(e) => {e.stopPropagation()}}>
                <div className={styles.container_modal}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Modal