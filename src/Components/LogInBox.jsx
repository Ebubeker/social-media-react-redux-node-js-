import React, {useState, useRef} from 'react';
import ModuleCss from './LogInBox.module.css';
import { Link, useNavigate } from 'react-router-dom';
import store from '../redux/store/store';
import {loggIn} from '../redux/actions/actions';
import subscribe from '../redux/store/subscribe';
import { LoginChecking } from '../server/login and registration/user';

const LogInBox = () => {
    const userInput = useRef(null);
    const passwordInput = useRef(null);
    let history = useNavigate();
    
    const submitLogin = (e) => {
        e.preventDefault();
        LoginChecking(userInput.current.value, passwordInput.current.value).then((result)=> {
            console.log(result)
            if(!result.failed){
                store.dispatch(loggIn(userInput.current.value, result.user.token, result.user.result._id));
                subscribe();
                window.location.reload(false);
                history('/');
            }else{
                alert('user not found!!!');
            }
        });
    }

    return (
        <div className={ModuleCss.box}>
            <h1 className={ModuleCss.h1}>Login</h1>
            <hr className={ModuleCss.hr}/>
            <form>
                <input className={ModuleCss.input} type="text" name="username" placeholder="Username" ref={userInput}/>
                <input className={ModuleCss.input} type="password" name="password" placeholder="Password" ref={passwordInput}/>
                <button className={ModuleCss.btn} type="submit" onClick={submitLogin}>Log In</button>
            </form>
            <p>If you don't have an account <Link to="/register" className={ModuleCss.link}>Register</Link></p>
        </div>
    )
}

export default LogInBox
