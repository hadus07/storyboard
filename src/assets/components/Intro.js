import React from 'react';

export default class Intro extends React.Component {
    render() {
        return (
            <div className="intro">
                <img src={require('../images/ibrohim.png')} alt="ibrohim" className="me"/>
                <dev className="introText">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, molestiae perspiciatis, rem ex architecto, facere quibusdam accusantium accusamus ipsa nostrum recusandae. Neque, minus possimus saepe nemo aliquam illum ut ipsa?</p>
                    <h3>Ibrohim Bahromov</h3>
                </dev>
            </div>
        );
    }
}