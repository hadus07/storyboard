import React from 'react';

export default class Intro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            quote: '',
        };
    }

    componentDidMount() {
        fetch('/quotes')
        .then(res => res.json())
        .then(res => {
            this.setState({
                author: res.author,
                quote: res.quote
            });
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="intro">
                <img src={require('../images/ibrohim.png')} alt="ibrohim" className="me"/>
                <dev className="introText">
                    <p>{this.state.quote}</p>
                    <h3>{this.state.author}</h3>
                </dev>
            </div>
        );
    }
}