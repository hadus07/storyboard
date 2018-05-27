import React from 'react';
import Nav from '../components/Nav';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Intro from '../components/Intro';
import Explore from '../components/Explore';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            case: 'signup',
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleLogin() {
        this.setState({
            case: 'login'
        });
    }

    handleSignup() {
        this.setState({
            case: 'signup'
        });
    }

    render() {

        const renderee = () => {
            if(this.state.case === 'signup') {
                return <Login onClick={this.handleLogin} />;
            }else if(this.state.case === 'login') {
                return <Signup onClick={this.handleSignup} />
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

                <Explore />

                <Categories />

                <div id="search">
                    <form action="">
                        <input type="text" className="inputBox" placeholder="Search for stories" />
                        <input type="button" className="button" value="Search"/>
                    </form>
                </div>

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