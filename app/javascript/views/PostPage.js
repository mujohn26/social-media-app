import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsAction } from '../redux/Actions/postsActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderComponent from '../components/Loader';
import { Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import CreatePost from '../components/post/CreatePost';
import '../assets/styles/post.scss';

const scrollStyle = {
	textAlign: 'center',
	marginTop: '15px'
};

const PostPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [ postsData, setPostsData ] = useState([]);
	const [ start, setStart ] = useState(0);
	const [ end, setEnd ] = useState(5);
	const [ hasMore, setHasMore ] = useState(true);
	const reducer = useSelector((state) => state.postsReducer);
	useEffect(() => {
		getAllPostsAction()(dispatch);
	}, []);
	useEffect(
		() => {
			if (reducer.loggedIn == false) {
				history.push('/login');
			}
		},
		[ reducer.loggedIn ]
	);
	const fetchMoreData = () => {
		if (postsData.length >= reducer.postsData.length) {
			setHasMore(false);
			return;
		}
		setTimeout(() => {
			setStart(start + 5);
			setEnd(end + 5);

			const concatedPostsData = postsData.concat(reducer.postsData.slice(start, end));
			setPostsData(concatedPostsData);
		}, 1500);
	};

	useEffect(() => {
			if (reducer.postsData !== undefined) {
				setPostsData(reducer.postsData.slice(start, end));
			}
	},[reducer.postsData])

	return (
		<div>
			{reducer.isLoading == true || reducer.postsData == undefined ? (
				<LoaderComponent />
			) : (
				<div className="post-page-container">
					<div className="upper-section" />
					<div className="middle-section">
						<div className="side-nav-section" />
						<div className="posts-container">
							<div className="create-post-container">
								<CreatePost data={reducer.postsData} />
							</div>
							<div className="post-card-container">
								<InfiniteScroll
									dataLength={postsData.length}
									next={fetchMoreData}
									hasMore={hasMore}
									loader={<div style={scrollStyle}>Loading...</div>}
									endMessage={
										<p style={scrollStyle}>
											<b>You have viewed it all</b>
										</p>
									}
								>
									{postsData.map((value, index) => (
										<div key={index} style={{ marginTop: '3%' }}>
											<PostCard data={value} token={reducer.token} />
										</div>
									))}
								</InfiniteScroll>
							</div>
						</div>
						<div className="right-nav-section" />
					</div>
				</div>
			)}
		</div>
	);
};

export default PostPage;
