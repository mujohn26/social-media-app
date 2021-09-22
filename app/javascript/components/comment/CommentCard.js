import React, { useEffect } from 'react'
import { Card, Image } from 'semantic-ui-react';
import Fromnow from 'react-fromnow';

import './commentCard.css'

const CommentCard = (props) => {

  useEffect(() => {
    console.log(props)
  })
  return (
      <div>
      {props.data !== undefined ? (
        <div className='comment-card-container'>
          <div className="comment-image-container">
        <div className="comment-pic-text">M J</div>
          </div>
          <div className='comment-wrapper'>
            <Card.Content>
              <div className="one-card-upper-section">
                <div className="left-section">

                  <div className="comment-name-section">M J</div>
                </div>
                <div>
                  <div style={{marginRight:'1%', width:'100px'}}>
                    <Fromnow date={props.data.created_at} />
                     
                  </div>
                </div>
              </div>
              <div style={{ marginTop:"2%", lineHeight: '22px', marginLeft:'2%' }}>{props.data.comment}</div>
            </Card.Content>
          </div>

        </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
   );
}
 
export default CommentCard;