import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Post from '../Components/Post';
import Navbar from '../Components/Navbar';
import {content, firstSide, secondSide, h3design, followList, logout} from './Profile.module.css';
import { Link } from 'react-router-dom';
import subscribe from '../redux/store/subscribe';
import { loggOff } from '../redux/actions/actions';
import store from '../redux/store/store';
import UserInfo from '../Components/UserInfo';
import SuggestedList from '../Components/SuggestedList';
import Footer from '../Components/Footer';


const Profile = () => {
    let userId = JSON.parse(localStorage.reduxState).id;

    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`/login/getuser/${userId}`)
        .then(response => {
            setUser(response.data);
        });

        axios.get(`/login/postContent/${userId}`)
        .then(response => {
            setPosts(response.data);
            // console.log(response.data);
        })
    }, [])

    const loggOut = () => {
        store.dispatch(loggOff());
        subscribe();
        history('/');
    }

    return (
        <div>
            <Navbar profileName={user.username}></Navbar>
            <div className={content}>
                <div className={firstSide}>
                    <h1 className={h3design}>User Information</h1>
                    <UserInfo user={user}></UserInfo>
                    <div className={followList}>
                        <SuggestedList name={user.username}/>
                    </div>
                </div>
                <div className={secondSide}>
                    <h1 className={h3design}>Posts from you</h1>
                    {posts.map(post => (
                        <Post key={post._id} profileName={user.username} post={post}></Post>
                    ))}
                </div>
            </div>
            <Link className={logout} onClick={loggOut} to="/">
                <p>LoggOut</p>
            </Link>
            <Footer/>
        </div>
    )
}

export default Profile;