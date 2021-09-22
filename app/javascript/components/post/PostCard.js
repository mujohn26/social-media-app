import React, { useEffect, useState } from 'react';
import { Card, Image, Input } from 'semantic-ui-react';
import Fromnow from 'react-fromnow';
import CommentCard from '../comment/CommentCard'
import LikeIcon from '../../assets/images/like-icon.png'
import CommentIcon from '../../assets/images/comment-icon.png'
import ShareIcon from '../../assets/images/share-icon.png'

import '../../assets/styles/post.scss';

const unselectedWrapperStyle = {
	width: '680px',
	margin: 'auto',
	maxHeight: '292px'

}
const selectedWrapperStyle = {
	width: '680px',
	margin: 'auto',
	minHeight: '292px',
	
}

const searchStyle = {
	width: '100%',
	height: '35px',
	backgroundColor:'transparent',
	border: 'none',
	boxShadow: 'none',
	outline: 'none',
	'&focus': {
		backgroundColor: 'transparent',
		border:'none'
	}
}

const PostCard = (props) => {
	const [openComment, setOpenComment] = useState(false);
	const [postId, setPostId] = useState();

	const handleOpenComment = (postId) => {
		setOpenComment(!openComment);
		setPostId(postId);

	}
	useEffect(() => {
		console.log(props);

	}, [ props ]);

	return (
		<div> 
			{props.data !== undefined ? (
				<Card style={openComment && props.data.post.id == postId ? selectedWrapperStyle : unselectedWrapperStyle}>
					<Card.Content>
						<div className="one-card-upper-section">
							<div className="left-section">
								<div className="profile-image-container">
									{/* {props.data.post.user.profileImage !== undefined ? (
										<Image floated="right" size="mini" src="/images/avatar/large/jenny.jpg" />
									) : ( */}
										<div className="profile-pic-text">J M</div>
									 {/* )} */}
								</div>
								<div className="user-name-section">John MUGIRANEZA</div>
							</div>
							<div>
								<div>
									<Fromnow date={props.data.post.created_at} />
								</div>
							</div>
						</div>
						<div style={{ marginTop: '3%', lineHeight:'22px' }}>{props.data.post.description}</div>
					</Card.Content>

					<div style={{ backgroundColor: 'rgba(196, 196, 196, 0.22)', height:'40px', width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between' }} extra>
						<div className='left-section-icons'>
							<div>
								<img src={LikeIcon} alt="like-icon" width='22' height='22'/>
							</div>
							<div className='icons-text like' >
								{props.data.comments.length}
							</div>
						</div>
						<div className='right-section-icons'>
							<div className='icons-section'>
								<div>
									<img src={ShareIcon} alt="share-icon" width='22' height='22'/>
								</div>
								<div className='icons-text' >
									{props.data.comments.length}
								</div>
							</div>

							<div className='icons-section'>
								<div style={{ cursor: 'pointer' }} onClick={() => { handleOpenComment(props.data.post.id)}}>
									<img src={CommentIcon} alt="comment-icon" width='22' height='22'/>
								</div>
								<div className='icons-text' >
									{props.data.comments.length>1000?(props.data.comments.length/1000).toFixed(1)+'k':props.data.comments.length}
								</div>
							</div>

						</div>
					</div>
					{
						openComment && props.data.post.id == postId ? (
								<div style={{ minHeight: '100px', overflowY: 'auto' }}>
									{props.data.comments.map((comment, index) => {
										return <CommentCard key={index} data={comment} />;
									})}
					
							</div>
						) : (<div style={{minHeight:"0px"}}>
									</div>)
					}
							
					<Card.Content style={{ backgroundColor: 'rgba(196, 196, 196, 0.22)', height: '47px', marginTop: openComment && props.data.post.id == postId ? "2%" : "0%" }} extra>
						<input placeholder='Comment...' style={searchStyle} />
						{/* Comment... */}
					</Card.Content>
				</Card>
			) : (
				<div>Loading</div>
			)}
		</div>
	);
};

export default PostCard;
