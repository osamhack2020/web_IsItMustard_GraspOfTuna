import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components'
import ReduxThunk from 'redux-thunk';
import { Provider } from "react-redux"; 
import logger from 'redux-logger';
import rootReducer from "./modules"; 

import AppContainer from "./containers/AppContainer.js";
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger))

const theme = createMuiTheme({
	typography: {
		fontFamily: '"Noto Sans KR", serif',
	},
	bgColor: "#DFE1DE",
});

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 0;
		font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
		"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;
		background-color: #EBEBEB;
	}

	* {
		margin: 0;
		padding: 0;
	}
`






ReactDOM.render(
	<Router>
		<GlobalStyle />
		<Provider store={store}>
				<MuiThemeProvider theme={theme}><AppContainer /></MuiThemeProvider>
		</Provider>
	</Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
