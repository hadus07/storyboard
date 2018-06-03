import React from 'react';
import { Link } from "react-router-dom";

import Nav from '../components/Nav';
import Intro from '../components/Intro';
import Explore from '../components/Explore';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import LinkToEditor from '../components/LinkToEditor';

import Login from '../components/Login';
import Signup from '../components/Signup';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            case: 'login',
            loggedIn: 'no',
            animation: '',
        };
    }

    handleSubmit() {
        
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
                            return  <Link to="/editor"><LinkToEditor /></Link>
                        }else if (this.state.loggedIn === 'no') {
                            return (
                                <div id="loginCont" style={{animationName: this.state.animation}}>
                                    <h1 className="logoName">Story<span>Board</span></h1>

                                    {(() => {
                                        if(this.state.case === 'login') return <Login onClick={this.handleSubmit} />;

                                        else if(this.state.case === 'signup') return <Signup onClick={this.handleSubmit} />;
                                    })()}

                                    <p>Don't have an account yet?
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

                <Categories />

                <div id="search">
                    <form action="">
                        <input type="text" className="inputBox" placeholder="Search for stories" />
                        <input type="button" className="button" value="Search"/>
                    </form>
                </div>

                <Explore />

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