import React from 'react';
import Popup from '../screens/Popup';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            message: '',
            stories: [],
            display: 'no',
            popupStory: '',
        };
    }
    handleSearch(e) {
        e.preventDefault();
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify({query: this.state.query.slice(0, 3)}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.length === 0) {
                this.setState({message: `No stories for "${this.state.query}" yet 😔`});
            }else {
                this.setState({stories: res});
            }
        })
        .catch(err => this.setState({message: `No stories for "${this.state.query}" yet 😔`}));
    }
    render() {
        return (
            <div id="search">
                <form onSubmit={this.handleSearch.bind(this)}>
                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="Search for stories" 
                        value={this.state.query}
                        onChange={(e) => this.setState({query: e.target.value})}
                    />
                    <input 
                        type="button"
                        className="button" 
                        value="Search" 
                        style={{width: '10%'}}
                        onClick={this.handleSearch.bind(this)}
                    />
                </form>

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

                <div className="searchItems dashCont">

                    {(() => {
                        if(this.state.stories.length !== 0) {
                            return this.state.stories.map(item => (
                                <div key={item.storyname} className="storySq">
                                    <h2>{item.storyname}</h2>
                                    <h4>{item.category}</h4>
                                    <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                                    <button 
                                        className="button moreBtn"
                                        onClick={() => {
                                            this.setState({
                                                popupStory: item.content || '',
                                                display: 'yes'
                                            });
                                        }}
                                    >More</button>
                                </div>
                            ));
                        }else {
                            return <p>{this.state.message}</p>
                        }
                    })()}
        
                </div>
            </div>
        );
    }
}