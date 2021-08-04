import React from 'react';
import CheckMarkIcon from '../assets/images/checkmark.png';
const styledContainer = {
    display: 'flex',
    flexDirection: 'row',
    width: '200px'
};

const styledDesc = {
    fontFamily: 'Poppins',
    fontDize: '20px',
    lineHeight: '26px',
    color: 'rgba(0, 0, 0, 0.33)',
    marginLeft: '2%',
    fontWeight: 'bold'

};

const CheckMark = (props) => {
    return (
        <div style={styledContainer}>
            <div>
                <img src={CheckMarkIcon} alt="check mark" width="20" height="20" />
            </div>
            <div style={styledDesc}>{props.description}</div>
        </div>
    );
};

export default CheckMark;
