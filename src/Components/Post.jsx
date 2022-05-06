import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import {cardPost, image, interactionIcons, postContent, section, icon, date} from './Post.module.css';
import ModuleCss from '../Components/Navbar.module.css';
import { Link } from 'react-router-dom';
import CommentSection from '../Components/CommentSection';
import {CommentProvider } from '../contexts/CommentContext';
import { getOneUser } from '../server/login and registration/user';
import { getComments } from '../server/posts/posts';
import { updateLike } from '../server/posts/posts';

const Post = ({ post }) => {

    const userLoggedIn = JSON.parse(localStorage.reduxState);
    const [user, setUser] = useState('');
    const [liked, setLiked] = useState('');
    const [commentIs, setCommentIs] = useState(false);
    const [allComments, setAllComments] = useState([]);
    
    useEffect(() => {

        getOneUser(post.user_id).then((resu)=>{
            if(resu.result){
                setUser(resu.user);
            }else{
                setUser([]);
            }
        })
        
        //check if you liked a post
        const likedtheposts = post.activity.usersLiking;
        let hasLiked = false;
        likedtheposts.map((userwholiked) => {
            if(userLoggedIn.id === userwholiked){
                setLiked('red');
                hasLiked = true;
            }
        })
        if(!hasLiked){
            setLiked('rgb(90, 90, 90)');
        }

        getComments(post._id).then((resu)=>{
            if(resu.result){
                setAllComments(resu.comments)
            }else{
                setAllComments([])
            }
        })

    }, [commentIs, allComments])

    const like = ()=>{
        updateLike(userLoggedIn, liked, post).then((resu)=>{
            setLiked(resu.newColor)
        })
    }

    const commentsOpen = () => {
        if(!commentIs){
            console.log('hi')
            setCommentIs(true);
        }else{
            setCommentIs(false);
        }
    }

    return (
        <section className={section}>
                    <div className={cardPost} >
                        <Link to='/otherProfiles' state={{ userToFollow: user }} className={ModuleCss.profile} style={{margin: "20px 0"}}>
                            <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="human" />
                            <h3 style={{color: "black"}}>{user.username}</h3>
                        </Link>
                        <p className={date}>{post.createdAt.split('T')[0]}    at    {post.createdAt.split('T')[1].split('.')[0]}</p>
                        <div className={image}>
                            <img src={post.imgUrl} alt="" />
                        </div>
                        <div className={interactionIcons}>
                            <div className={icon}>
                                <FontAwesomeIcon style={{'color': liked}} onClick={like} icon={faHeart}></FontAwesomeIcon> {post.activity.likes}
                            </div>
                            <div className={icon}>
                                <FontAwesomeIcon onClick={commentsOpen} style={{'color': 'rgb(90, 90, 90)'}} icon={faComment}></FontAwesomeIcon> {allComments.length}
                            </div>
                        </div>
                        <div className={postContent}>
                            <p>{post.content}</p>
                        </div>
                        <CommentProvider>
                            <CommentSection initialState={commentIs} currentUser_Id={userLoggedIn.id} post={post}/>
                        </CommentProvider>
                    </div>
            </section>
    )
}

export default Post
