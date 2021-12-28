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
import {icons, messageBox, loadMoreBtn} from '../Components/PostList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';


const Profile = () => {
    let userId = JSON.parse(localStorage.reduxState).id;

    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5)
    let counter = 0;

    useEffect(() => {
        axios.get(`https://social-media-backend-2210.herokuapp.com/login/getuser/${userId}`)
        .then(response => {
            setUser(response.data);
        });

        axios.get(`https://social-media-backend-2210.herokuapp.com/login/postContent/${userId}`)
        .then(response => {
            setPosts(response.data);
        })
    }, [limit])

    const loggOut = () => {
        store.dispatch(loggOff());
        subscribe();
        window.location('/');
    }

    const loadMorePosts = () =>{
        setLimit(limit + 5);
    }

    return (
        <div>
            <Navbar profileName={user.username}></Navbar>
            <div className={content}>
                <div className={firstSide}>
                    <h1 className={h3design}>User Information</h1>
                    <UserInfo user={user} activity={user.activity}></UserInfo>
                    <div className={followList}>
                        <SuggestedList name={user.username}/>
                    </div>
                </div>
                <div className={secondSide}>
                    <h1 className={h3design}>Posts from you</h1>
                    {posts.map((post) => {
                        if(counter < limit){
                            counter++;
                            return(<Post key={post._id} profileName={user.username} post={post}></Post>);
                        }
                    })}
                    <p className={messageBox}>This platform offers milions of posts, try to also create your content and share it with others. If you wish to continue type the large button bellow to load 5 more posts</p>
                    <div onClick={loadMorePosts} className={loadMoreBtn}>
                        <p>Load More posts</p>
                        <FontAwesomeIcon icon={faArrowAltCircleDown} className={icons}></FontAwesomeIcon>
                    </div>
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