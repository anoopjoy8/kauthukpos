import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector } from "react-redux";
import { Icon } from '@mdi/react';
import { mdiAlert, mdiInformation, mdiCheckCircle } from '@mdi/js';

function ModalPopup(props) {
    const [show, setShow] = useState(props.showModal);
    const handleClose = () => setShow(false);
    const footerClassName = props.modalType === 'error' || props.modalType === 'success' ? 'justify-content-center' : '';
    const getIconProps = () => {
        switch (props.modalType) {
            case 'error':
                return { path: mdiAlert, color: 'red' };
            case 'info':
                return { path: mdiInformation, color: 'blue' };
            case 'success':
                return { path: mdiCheckCircle, color: 'green' };
            default:
                return null;
        }
    };
    useEffect(() => {
        setShow(props.showModal);
    }, [props.showModal]);
    
    const iconProps = getIconProps();
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header >
                    <Modal.Title>{props.title}</Modal.Title>
                    {iconProps && (
                        <Icon {...iconProps}
                            size={1}
                            className="me-2"
                        />
                    )}
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer className={footerClassName}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {props.modalType !== 'error' || props.modalType !== 'success' && (
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPopup;