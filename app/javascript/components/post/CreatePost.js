import React, { useState, useRef, useEffect } from 'react';
import { TextArea, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {createPostAction} from '../../redux/Actions/postsActions'
import NoteIcon from '../../assets/images/note.png';
import { useHistory } from 'react-router-dom';


const styleSuccessMessage = {
  color: '#36a91d',
  marginLeft: '5%',
  width:'60%'
  
};


const CreatePost = (props) => {
	const history = useHistory()
  const [description, setDescription] = useState("")
  const textInput = useRef(null);
  
  const dispatch = useDispatch()
  const state = useSelector((state) => state.postsReducer);


	const setFocus = () => {
		textInput.current.focus();
  };
  
  const createPost = () => {
    if(description!==""){
    createPostAction(description, props.data)(dispatch)}
	}
	
	useEffect(
		() => {
			if (state.loggedIn == false) {
				history.push('/login');
			}
		},
		[ state.loggedIn ]
  );
  
	useEffect(
		() => {
			if (state.successMessage !== undefined) {
				history.push('/posts');
				location.reload();
			}
		},
		[ state.successMessage ]
	);
	return (
		<div className="create-post-card-container">
			<div className="create-post-upper-card">
				<div className="create-post-button-container">
					<div>
						<img src={NoteIcon} alt="note icon" height="30" width="30" />
					</div>
					<div
						style={{
							marginTop: '5%',
							fontSize: '18px',
							fontWeight: 'bold',
							marginLeft: '3%',
							cursor: 'pointer'
						}}
						onClick={setFocus}
					>
						Create Post
					</div>
				</div>
				<div />
			</div>
			<div >
				<TextArea
					placeholder="Share your ideas and feelings with people around the world..."
					className="create-post-lower-card"
          ref={textInput}
          onChange={(event)=>{setDescription(event.target.value)}}
				/>
			</div>
      <div style={{ width: '100%', display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
  				<div style={styleSuccessMessage}>
					{ state.successMessage }
        </div>
        <div>
          {state.isLoadingCreate ? ("Posting..") : (
				<Button id="submit-btn" style={{ backgroundColor: description!==''?'#36a91d':'#e3e6ea', color: description!==''?'white':'#bcc0c4', width: '182px', marginTop:'1%'  }} onClick={createPost}>
					Post
				</Button>
            
      )}
        </div>
			</div>
		</div>
	);
};

export default CreatePost;
