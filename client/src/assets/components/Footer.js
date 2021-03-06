import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div id="footer">
                <div className="contactAbout">
                    <ul className="contact">
                        <h3>Contact</h3>
                        <li className="contactItem">+8210-7569-5653</li>
                        <li className="contactItem">hadus_bi@mail.ru</li>
                        <li className="contactItem">Seoul Gwangjin-gu Gunja-dong</li>
                    </ul>

                    <div className="bar"></div>

                    <div className="about">
                        <h3>About</h3>
                        <p>StoryBoard is one of the best online story writing community in the world. Create your stories without warrying about the storage and promotion. Feel free to reply us if you have any questions</p>
                    </div>

                    <div className="shareButtons">
                        <a target='blank' href="https://facebook.com"><img src={require('../images/fb.png')} alt="social button"/></a>
                        <a target='blank' href="https://instagram.com"><img src={require('../images/ins.png')} alt="social button"/></a>
                        <a target='blank' href="https://linkedin.com"><img src={require('../images/li.png')} alt="social button"/></a>
                        <a target='blank' href="https://snapchat.com"><img src={require('../images/sn.png')} alt="social button"/></a>
                        <a target='blank' href="https://twitter.com"><img src={require('../images/tw.png')} alt="social button"/></a>
                        <a target='blank' href="https://whatsapp.com"><img src={require('../images/wa.png')} alt="social button"/></a>
                    </div>
                </div>
                <p>© Copyright 2018</p>
            </div>
        );
    }
}