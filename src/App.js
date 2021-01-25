import React from 'react';
import GlobalStyle from './components/GlobalStyle';
//import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';

function App() {
	return (
		<React.Fragment>
			<GlobalStyle />

			<LandingPage />
		</React.Fragment>
	);
}

export default App;
