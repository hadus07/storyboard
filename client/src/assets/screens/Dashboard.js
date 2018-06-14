import React from 'react';
import Popup from './Popup';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            fullname: localStorage.getItem('fullname') || '',
            username: localStorage.getItem('username') || '',
            dyingStory: '',
            stories: [],

            loggedIn: localStorage.getItem('loggedIn') || 'no',
            display: 'no',
            popupStory: '',
        };

        this.getStories = this.getStories.bind(this);
    }

    getStories() {
        fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify({
                username: localStorage.getItem('username'),
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.length !== 0) {
                this.setState({stories: res});
            }
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getStories();
    }

    render() {
        return (() => {
            if(this.state.loggedIn === 'no') {
                return (
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'black',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}
                    ><h1>You must be logged in to use this feature!</h1></div>
                );
            }else {
                return (
                    <div id="dashboard">
                        
                        <div className="profile">
                            <div>
                                <h2>{this.state.fullname}</h2>
                                <h4>{this.state.username}</h4>
                            </div>
                            <h1>{this.state.stories.length} stories</h1>
                            <button className="button" onClick={this.getStories}>↺</button>
                        </div>
                        
                        <div className="dashCont">
                            {(() => {
        
                                if(this.state.stories.length === 0) {
                                    return <p>You don't have any stories yet</p>
                                }else {
                                    return this.state.stories.map(item => {
                                        return (
                                            <div key={item.storyname} className="storySq">
                                                 <h2 ref={this.dyingStory}>{item.storyname}</h2>
                                                 <h4>{item.category}</h4>
                                                 <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                                                 <button className="button" onClick={() => {
                                                     this.setState({
                                                        popupStory: item.content || '',
                                                        display: 'yes'
                                                    });
                                                 }}>More</button>
                                                 <button className="delete" onClick={() => {

                                                    fetch('/deleteStory', {
                                                        method: 'POST',
                                                        body: JSON.stringify({
                                                            username: localStorage.getItem('username'),
                                                            storyname: item.storyname,
                                                        }),
                                                        headers: {
                                                            'Content-type': 'application/json'
                                                        }
                                                    })
                                                    .then(res => res.json())
                                                    .then(res => {
                                                        this.setState({stories: res});
                                                    })
                                                    .catch(err => console.log(err));

                                                    this.getStories();

                                                 }}>x</button>
                                             </div>
                                        );
                                    });
                                }
        
                            })()}
                        </div>
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
                    </div>
                );
            }
        })();
    }
}