import React from 'react';

export default class Explore extends React.Component {
    render() {
        return (
            <div id="explore">
                <div className="exploreCont">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium non animi tempora quod, quidem ratione corporis nobis temporibus aliquid soluta aperiam maxime repellendus, quis explicabo molestias quisquam. Illum, quam magni!
                    Minus, repudiandae? Magni adipisci molestias fugiat non est aliquid, repudiandae nesciunt hic, enim esse nobis. Dolorem, similique voluptatem quod reprehenderit nihil amet rerum sed a minus temporibus quae commodi sint!
                    Sunt adipisci voluptates omnis nesciunt hic? Odit fugiat nisi, minus dolorum, omnis porro molestias incidunt ex at enim rem deleniti eum veritatis dicta consectetur nobis tempora quis vitae eligendi explicabo?
                    Ipsam qui vero, similique reiciendis commodi sit eos sunt temporibus magnam fugit modi voluptatibus saepe iure? Velit error ipsa dicta, commodi dolorum ullam, iure modi cum deleniti libero blanditiis dolor.</p>

                    <img src={require('../images/explore.jpg')} alt="Explore" className="exploreImg"/>
                </div>

                <div className="author">
                    <h3>Author Name</h3>
                    <h4>Story Name</h4>
                    <button className="button">More</button>
                </div>
            </div>
        );
    }
}