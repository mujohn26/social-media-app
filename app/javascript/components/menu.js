import React, { useEffect } from 'react';
import "../assets/styles/menu.scss"

const Menu = (props) => {
    return (
        <div className="menu-container" >
            <div>
                <a style={props.type=='header'?{ color: 'black' }:{color:'white'}}>Home</a>
            </div>
            <div>
                <a style={props.type == 'header' ? { color: 'black' } : { color: 'white' }}>About</a>
            </div>
            <div>
                <a style={props.type == 'header' ? { color: 'black' } : { color: 'white' }}>Contact</a>
            </div>

        </div>);
};

export default Menu;
