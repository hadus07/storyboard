import React from 'react';
import Popup from '../screens/Popup';

export default class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            author: '',
            storyname: '',
        };
    }

    componentDidMount() {
        fetch('/randomStory')
        .then(res => res.json())
        .then(res => {
            this.setState({
                content: res.content,
                author: res.author,
                storyname: res.storyname,
            });
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="explore">
                <div className="exploreCont">
                    <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>

                    <img src={require('../images/explore.jpg')} alt="Explore" className="exploreImg"/>
                </div>

                <div className="author">
                    <h3>{this.state.author}</h3>
                    <h4>{this.state.storyname}</h4>
                    <button
                        className="button"
                        onClick={() => this.setState({display: 'yes'})}
                    >More</button>
                </div>

                {(() => {
                    if(this.state.display === 'yes') {
                        return (
                            <Popup 
                                style={{backgroundColor: 'transparent'}}
                                story={this.state.content}
                                onClick={() => {
                                    this.setState({display: 'no'});
                                }}
                            />
                        );
                    }
                })()}
            </div>
        );
    }
}