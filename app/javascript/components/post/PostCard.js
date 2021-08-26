import React, { useEffect, useState } from 'react';
import verifyToken from '../../helpers/verifyToken';
import { Card, Image } from 'semantic-ui-react';
import Fromnow from 'react-fromnow';

import '../../assets/styles/post.scss';

const PostCard = (props) => {
	const decodeToken = () => {
		const data = verifyToken(props.token);
		setDecodedToken(data);
	};

	useEffect(() => {}, [ props ]);

	return (
		<div>
			{props.data !== undefined ? (
				<Card style={{ width: '680px', maxHeight: '292px', margin: 'auto' }}>
					<Card.Content>
						<div className="one-card-upper-section">
							<div className="left-section">
								<div className="profile-image-container">
									{props.data.profileImage !== undefined ? (
										<Image floated="right" size="mini" src="/images/avatar/large/jenny.jpg" />
									) : (
										<div className="profile-pic-text">{props.data.user.last_name[0]}</div>
									)}
								</div>
								<div className="user-name-section">{props.data.user.last_name} {props.data.user.first_name}</div>
							</div>
							<div>
								<div>
									<Fromnow date={props.data.created_at} />
								</div>
							</div>
						</div>
						<div style={{ marginTop: '3%', lineHeight:'22px' }}>{props.data.description}</div>
					</Card.Content>

					<Card.Content style={{ backgroundColor: 'rgba(196, 196, 196, 0.22)' }} extra>

					</Card.Content>
					<Card.Content style={{ backgroundColor: 'rgba(196, 196, 196, 0.22)' }} extra>
						Comment...
					</Card.Content>
				</Card>
			) : (
				<div>Loading</div>
			)}
		</div>
	);
};

export default PostCard;
