import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Navigation from './components/Navigation';
import NavContainer from './containers/NavContainer';
import LandingPage from './pages/LandingPage';
import GuidePage from './pages/GuidePage';

function App() {
	return (
		<React.Fragment>
			<Router>
				<Route>
					<GlobalStyle />
					<NavContainer />
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/guide" component={GuidePage} />
					</Switch>
				</Route>
			</Router>
		</React.Fragment>
	);
}

export default App;
