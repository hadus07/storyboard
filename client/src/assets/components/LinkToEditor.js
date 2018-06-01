import React from 'react';

export default class LinkToEditor extends React.Component {
    render() {
        return (
            <div id="link-to-editor">
                <div className="bouncy">
                    <img src={require('../images/edit.png')} alt="Icon"/>
                    <button className="button" onClick={this.props.onClick}>Go to Editor</button>
                </div>
            </div>
        );
    }
}