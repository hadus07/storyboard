import React from 'react';

export default class Nav extends React.Component {
    render() {
        return (
            <ul className="navigation">
                <li className="navigationHome">
                    <a href="/">Storyboard</a>
                </li>
                <li className="navigationItem">
                    <a href="#categories">Categories</a>
                </li>
                <li className="navigationItem">
                    <a href="#explore">Explore</a>                
                </li>
                <li className="navigationItem">
                    <a href="#footer">Contact & About</a>
                </li>
            </ul>
        );
    }
}