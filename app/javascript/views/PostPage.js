import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsAction } from '../redux/Actions/postsActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderComponent from '../components/Loader';
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
	const [postsDataArr, setPostsDataArr] = useState([])
	const [postsData, setPostsData] = useState([]);
	const [page,setPage]=useState(1)
	const [ hasMore, setHasMore ] = useState(true);
	const reducer = useSelector((state) => state.postsReducer);
	useEffect(async() => {
		await getAllPostsAction(page)(dispatch);
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
		setTimeout( async() => {
			await getAllPostsAction(page)(dispatch);
		}, 1500);
	};

	useEffect(() => {
		if (reducer.postsData !== undefined) {
			setPage(page+1)
			setPostsData(reducer.postsData);
			reducer.postsData.map((value) => {
				postsDataArr.push(value)
			})
			}
	},[reducer.postsData])

	return (
		<div>
			{reducer.isLoading == true || postsDataArr == undefined ? (
				<LoaderComponent />
			) : (
				<div className="post-page-container">
					<div className="upper-section" />
					<div className="middle-section">
						<div className="side-nav-section" />
						<div className="posts-container">
							<div className="create-post-container">
								<CreatePost data={postsDataArr} />
							</div>
							<div className="post-card-container">
								<InfiniteScroll
									dataLength={postsDataArr.length}
									next={fetchMoreData}
									hasMore={hasMore}
									loader={<div style={scrollStyle}>Loading...</div>}
									endMessage={
										<p style={scrollStyle}>
											{/* <b>You have viewed it all</b> */}
										</p>
									}
								>
									{postsDataArr.map((value, index) => (
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
