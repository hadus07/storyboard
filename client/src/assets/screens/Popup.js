import React from 'react';

export default class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: 'flex',
        };
    }

    componentDidMount() {
        this.setState({display: 'flex'});
    }

    render() {
        return (
            <div className="popup-cont" style={{display: this.state.display}}>
                <div className="popup-close" onClick={this.props.onClick}>x</div>
                <div className="popup-box" dangerouslySetInnerHTML={{__html: this.props.story}}></div>
            </div>
        );
    }
}