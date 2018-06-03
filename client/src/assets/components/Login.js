import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                <input 
                    name="username" 
                    className="inputBox" 
                    type="text" 
                    placeholder="username" 
                    value={this.state.username}
                    onChange={(e) => this.setState({username: e.target.value})}
                    autoComplete=""
                    required
                />
                <input 
                    name="password" 
                    className="inputBox" 
                    type="password" 
                    placeholder="password" 
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                    autoComplete="current-password"
                    required 
                />
                <input 
                    type="submit" 
                    className="button" 
                    value="Login" 
                    onClick={this.props.onClick} 
                />
            </form>
        );
    }
}