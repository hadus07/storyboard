import React from 'react';

export default class Signup extends React.Component {
    render() {
        return (
            <div id="signupCont">
                <h1 className="logoName">Story<span>Board</span></h1>

                <form className="form" action="#">
                    <input type="text" name="fullname" className="inputBox" placeholder='Ibrohim Bahromov'/>
                    <input type="text" name="username" className="inputBox" placeholder="hadus_bi"/>
                    <input type="email" name="email" className="inputBox" placeholder="hadus_bi@mail.ru"/>
                    <input type="date" name="birthday" className="inputBox" placeholder="birthday"/>
                    <input type="password" name="password" className="inputBox" placeholder="password"/>
                    <input type="password" name="password" className="inputBox" placeholder="password"/>
                    <input type="button" value="Signup" className="button"/>
                </form>

                <p>Don't have an account yet? <button onClick={this.props.onClick}>Log in</button></p>
            </div>
        );
    }
}