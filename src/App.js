import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavContainer from './components/NavContainer';
import LandingPage from './pages/LandingPage';
import GuidePage from './pages/GuidePage';
import InfoPage from './pages/InfoPage';

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
						<Route exact path="/info" component={InfoPage} />
					</Switch>
				</Route>
			</Router>
		</React.Fragment>
	);
}

export default App;
