import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllPostsAction } from '../redux/Actions/postsActions'
import Loader from '../components/Loader';
import { useHistory } from "react-router-dom";
import PostCard from '../components/post/PostCard'
import '../assets/styles/post.scss'


const PostPage = (props) => {
const history = useHistory()
const dispatch = useDispatch();
const reducer = useSelector((state) => state.postsReducer);
  useEffect(() => {
    getAllPostsAction()(dispatch);
  }, [])
  useEffect(() => {
    if (reducer.loggedIn == false) {
      history.push('/login')
    }
  },[reducer.loggedIn]) 
  return (
  <>
      {reducer.data == undefined? (
        <Loader />
        
      ) : (
              
        <div className="post-page-container">
          <div className='upper-section'>

          </div>
          <div className='middle-section'>
            <div className='side-nav-section'>

            </div>
            <div className='posts-container'>
              <div className='create-post-container'>

                </div>
                <div className='post-card-container'>
                  {reducer.data.map((value, index) => {
                    return (
                    <div key={index} style={{marginTop:'3%'}}>
                      <PostCard data={value} token={reducer.token}/>
                      </div>
                      
                    )
                  })}
              </div>
            </div>
            <div className='right-nav-section'>

            </div>
    

          </div>
        </div>
      )}
    </>
  );
}
 
export default PostPage;
