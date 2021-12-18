import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {h3Design} from '../Components/CreatePost.module.css';
import Post from './Post';
import {containerforall} from './PostList.module.css';

const PostList = ({name}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`/login/postContent`)
        .then((result) => {
            // const data = result.data;
            // data.map(da => setPosts(da));
            setPosts(result.data)
        })
    }, [])

    return (
        <section >
            <div className={containerforall}>
                <h3 className={h3Design} style={{marginTop: "50px"}}>Posts from your friends</h3>
            </div>
            {posts.map((post)=>(
                <Post key={post._id} profileName={name} post={post}></Post>
            ))}
        </section>
    )
}

export default PostList
