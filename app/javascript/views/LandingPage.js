import React,{useEffect, useState} from 'react';
import '../assets/styles/homePage.scss';
import ChatIcon from '../assets/images/chat.png';
import Vector1Icon from '../assets/images/vecto1.png';
import Menu from '../components/menu';
import CheckMark from '../components/checkmark'
import Footer from '../components/Footer'
import SignupPage from '../views/auth/Signup'
import { Modal } from 'semantic-ui-react'

const LandingPage = (props) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (props.showSignup == true) {
            setOpen(true)
        }
    },[])
    return (
        <>
            <Modal
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{width:'400px', minHeight:'550px'}}
            >
                <Modal.Header style={{textAlign:'center'}}>Create account</Modal.Header>
                <Modal.Content>
                <SignupPage/>

                </Modal.Content>
                </Modal>
        <div className="container">
            <div className="header">
                <div className="vector1-icon">
                    <img src={Vector1Icon} alt="vector 1" />
                </div>
                <div className="menu-container">
                    <div>
                        <Menu type="header" />
                    </div>
                    <div>
                            <button class="ui button" style={{ backgroundColor: '#FF8A00', color: 'white' }} onClick={() => { setOpen(true) }}>
                            <i class="user circle outline icon" />
							Create account
						</button>
                    </div>
                </div>
            </div>
            <div className="body-container">
                <div className='title-container'>
                    <div>

                        <h1>Simple <label>social media</label> to connect</h1>

                        <h1>with people around the world.</h1>
                    </div>
                    <div className='inputs-container'>
                        <div class="ui input">
                            <input type="text" placeholder="Your email..." class="" style={{ width: '350px' }} />
                            <button class="ui button" style={{ backgroundColor: '#36a91d', color: 'white', marginLeft: '5%', width: '243px' }}>
                                Login to your account
						</button>
                        </div>
                    </div>
                </div>
                <div className='chat-img-container'>
                    <div>

                        <img src={ChatIcon} alt="chat icon" />
                    </div>

                </div>
            </div>
            <div className='middle-section-container'>
                <div className='background-img'>
                    <div className='middle-section-title'>

                        <h1 >
                            Why using our platform
                    </h1>
                    </div>
                    <div className='checkmark-container'>
                        <CheckMark description='Easy to use' />
                        <CheckMark description='High number of users' />
                        <CheckMark description='No credit card required' />
                    </div>
                </div>

            </div>
            <div>
                <Footer />
            </div>
            </div>
            </>
    );
};

export default LandingPage;
