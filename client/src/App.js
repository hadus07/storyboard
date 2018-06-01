import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Home from './assets/screens/Home';
import TextEditor from './assets/screens/TextEditor';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<Router>
				<div className="body">
					{/* <Home /> */}

					<Route exact path="/" component={Home} />
					<Route path="/editor" component={TextEditor} />
				</div>
			</Router>
		);
	}
}

export default App;
