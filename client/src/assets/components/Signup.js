import React from 'react';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            email: '',
            password1: '',
            password2: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.password1 !== this.state.password2) alert('Passwords don\'t match');

        const data = {
            fullname: this.state.fullname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password1
        }

        fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                this.props.onClick(res); 
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                <input 
                    name="fullname" 
                    type="text" 
                    className="inputBox" 
                    placeholder="fullname"
                    value={this.state.fullname}
                    onChange={e => this.setState({fullname: e.target.value})}
                    autoComplete="name"
                    required
                />
                <input 
                    name="username" 
                    type="text" 
                    className="inputBox" 
                    placeholder="username"
                    value={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                    autoComplete="username"
                    required
                />
                <input 
                    name="email" 
                    type="email" 
                    className="inputBox" 
                    placeholder="email"
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value})} 
                    autoComplete="email"
                    required
                />
                <input 
                    name="password1" 
                    type="password" 
                    className="inputBox" 
                    placeholder="password"
                    value={this.state.password1}
                    onChange={e => this.setState({password1: e.target.value})}
                    autoComplete="new-password"
                    required
                />
                <input 
                    name="password2" 
                    type="password" 
                    className="inputBox" 
                    placeholder="password"
                    value={this.state.password2}
                    onChange={e => this.setState({password2: e.target.value})}
                    autoComplete="new-password"
                    required
                />
                <input 
                    type="submit" 
                    value="Signup" 
                    className="button"
                />
            </form>
        );
    }
}