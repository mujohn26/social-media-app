import React, { useEffect, useState } from 'react';
import SignupPage from '../views/auth/Signup'
import LoginPage from '../views/auth/Login';
import { Modal } from 'semantic-ui-react'

function useAuthModal(page) {
    const [open, setOpen] = useState(false)
    const [pageType, setPageType] = useState('')


    const closeModal = () => {
        setOpen(false)
    }

    const openSignup = () => {
        setPageType('signup')
        setOpen(true)
    }
    const openLogin = () => {
        setPageType('login')
        setOpen(true)


    }

    useEffect(() => {
        if (page == 'signup') {
            openSignup()
        }
        else if (page == 'login') {
            openLogin()
        }
        else {
            closeModal()
        }

    }, [])
    function AuthModal(props) {

        return (
            <Modal
                closeIcon
                onClose={closeModal}
                open={open}
                style={{ width: '400px', minHeight: '550px' }}
            >
                <Modal.Header style={{ textAlign: 'center' }}>{pageType == 'login' ? 'Login' : 'Create account'}</Modal.Header>
                <Modal.Content>
                    {pageType == 'login' ? (<LoginPage email={props.email}/>) : (<SignupPage />)}
                </Modal.Content>
            </Modal>

        )
    }

    return [ openSignup, openLogin, AuthModal]
}

export default useAuthModal;