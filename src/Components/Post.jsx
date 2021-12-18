import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import {cardPost, image, interactionIcons, postContent, section, icon, date} from './Post.module.css';
import ModuleCss from '../Components/Navbar.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = ({profileName, post}) => {

    const [user, setUser] = useState('');

    useEffect(() => {
        axios.get(`/login/getuser/${post.user_id}`)
        .then((response)=>{
            // console.log(response)
            setUser(response.data);
        })
    }, [])


    return (
        <section className={section}>
            <div className={cardPost}>
                <Link to='/profile' className={ModuleCss.profile} style={{margin: "20px 0"}}>
                    <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="human" />
                    <h3 style={{color: "black"}}>{user.username}</h3>
                </Link>
                <p className={date}>{post.createdAt.split('T')[0]}    at    {post.createdAt.split('T')[1].split('.')[0]}</p>
                <div className={image}>
                    <img src={post.imgUrl} alt="" />
                </div>
                <div className={interactionIcons}>
                    <div className={icon}>
                        <FontAwesomeIcon  icon={faHeart}></FontAwesomeIcon> 0
                    </div>
                    <div className={icon}>
                        <FontAwesomeIcon  icon={faComment}></FontAwesomeIcon> 0
                    </div>
                </div>
                <div className={postContent}>
                    <p>{post.content}</p>
                </div>
            </div>
        </section>
    )
}

export default Post
