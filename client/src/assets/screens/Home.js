import React from 'react';
import { Link } from "react-router-dom";

import Nav from '../components/Nav';
import Intro from '../components/Intro';
import Explore from '../components/Explore';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import LinkToEditor from '../components/LinkToEditor';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            case: 'signup',
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
    }

    handleLogin() {
        this.setState({
            case: 'login',
        });
    }

    handleSignup() {
        this.setState({
            case: 'signup',
        });
    }

    handleConfirmClick() {
        this.setState({
            case: 'editor'
        });
    }


    render() {

        const renderee = () => {
            if(this.state.case === 'signup') {
                return (
                    <div id="loginCont">
                        <h1 className="logoName">Story<span>Board</span></h1>

                        <form className="form" name="login" action="">
                            <input type="text" name="username" className="inputBox" placeholder="username" />
                            <input type="password" name="password" className="inputBox" placeholder="password" />
                            <input type="button" value="Login" className="button" onClick={this.handleConfirmClick}/>
                        </form>

                        <p>Don't have an account yet? <button id="signupbtn" onClick={this.handleLogin}>Sign Up</button></p>
                    </div>
                );
            }else if(this.state.case === 'login') {
                return (
                    <div id="signupCont">
                        <h1 className="logoName">Story<span>Board</span></h1>

                        <form className="form" action="" name="signup">
                            <input type="text" name="fullname" className="inputBox" placeholder='fullname'/>
                            <input type="text" name="username" className="inputBox" placeholder="username"/>
                            <input type="text" name="email" className="inputBox" placeholder="email" />
                            <input type="password" name="password1" className="inputBox" placeholder="password"/>
                            <input type="password" name="password2" className="inputBox" placeholder="password"/>
                            <input type="button" value="Signup" className="button" onClick={this.handleConfirmClick}/>
                        </form>

                        <p>Don't have an account yet? <button id="loginbtn" onClick={this.handleSignup}>Log in</button></p>
                    </div>
                );
            }else if(this.state.case === 'editor') {
                return <Link style={{textDecoration: 'none'}} to="/editor"><LinkToEditor /></Link>
            }
        }

        return (
            <div id="home">
                <Nav />

                <div id="rotatedImg"></div>

                <div className="rotatedBox"></div>

                <div className="introLogin">
                    <Intro />
                    {renderee()}
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