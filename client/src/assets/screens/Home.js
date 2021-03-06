import React from 'react';
import { Link } from "react-router-dom";

import Nav from '../components/Nav';
import Intro from '../components/Intro';
import Explore from '../components/Explore';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import LinkToEditor from '../components/LinkToEditor';

import Login from '../components/Login';
import Signup from '../components/Signup';

import Popup from './Popup';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            case: 'login',
            loggedIn: localStorage.getItem('loggedIn') || 'no',
            animation: '',
            message: '',
            fullname: localStorage.getItem('fullname'),
            username: localStorage.getItem('username'),
        };
    }

    componentDidMount() {
        this.setState({
            loggedIn: localStorage.getItem('loggedIn'),
            fullname: localStorage.getItem('fullname'),
            username: localStorage.getItem('username'),
            animation: 'jump'
        });
        
        setTimeout(() => this.setState({animation: ''}), 500);

        setTimeout(() => {
            localStorage.setItem('loggedIn', 'no')
        }, 1000*60*60*24);

    }

    handleAuth(res) {
        localStorage.setItem('loggedIn', res.access);
        localStorage.setItem('fullname', res.fullname);
        localStorage.setItem('username', res.username);

        this.setState({
            loggedIn: res.access,
            message: res.message,
            fullname: res.fullname,
            username: res.username,
        });

        setTimeout(() => this.setState({message: ''}), 3000);
    }

    render() {

        return (
            <div id="home">
                <Nav />

                <div id="rotatedImg"></div>

                <div className="rotatedBox"></div>

                <div className="introLogin">
                    <Intro />
                    {(() => {
                        if(this.state.loggedIn === 'yes') {
                            return  (
                                <div id="loginCont" style={{animationName: this.state.animation}}>
                                    <h1 className="logoName">Story<span>Board</span></h1>

                                    <p className="errorMsg">{this.state.message}</p>

                                    <Link to="/dashboard">
                                        <div className="userCont">
                                            <img src={require('../images/profile.png')} alt="Icon"/>
                                            <h2>{this.state.fullname}</h2>
                                        </div>
                                    </Link>

                                    <Link to="/editor"><LinkToEditor /></Link>

                                    <button onClick={() => {
                                        localStorage.setItem('loggedIn', 'no');
                                        this.setState({loggedIn: 'no'});
                                    }}>Sign out</button>
                                </div>
                            );
                        }else {
                            return (
                                <div id="loginCont" style={{animationName: this.state.animation}}>
                                    <h1 className="logoName">Story<span>Board</span></h1>

                                    <p className="errorMsg">{this.state.message}</p>

                                    {(() => {
                                        if(this.state.case === 'login') return <Login onClick={this.handleAuth.bind(this)} />;

                                        else if(this.state.case === 'signup') return <Signup onClick={this.handleAuth.bind(this)} />;
                                    })()}

                                    <p>
                                        
                                        {(() => {
                                            if(this.state.case === 'login') return 'Don\'t have an account yet? ';
                                            else if(this.state.case === 'signup') return 'Already have an account? ';
                                        })()}

                                        <button id="signupbtn" onClick={() => {
                                            if(this.state.case === 'login') this.setState({case: 'signup'});
                                            if(this.state.case === 'signup') this.setState({case: 'login'});
                                            this.setState({animation: 'slidein'});
                                            setTimeout(() => this.setState({animation: ''}), 500);
                                        }}>

                                            {(() => {
                                                if(this.state.case === 'login') return 'Sign up';
                                                else if(this.state.case === 'signup') return 'Log in';
                                            })()}

                                        </button>

                                    </p>
                                </div>
                            );
                        }
                    })()}
                </div>

                <Search />
                
                {(() => {
                    if(this.state.display === 'yes') {
                        return (
                            <Popup 
                                story={this.state.popupStory}
                                onClick={() => {
                                    this.setState({display: 'no'});
                                }}
                            />
                        );
                    }
                })()}

                <Explore />

                <Categories />

                <div id="subscribe">
                    <form action="">
                        <input type="text" className="inputBox" placeholder="Enter your email" />
                        <input type="button" className="button" value="Subscribe"/>
                    </form>
                </div>

                <Footer />

            </div>
        );
    }
};