import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './global-styles';

ReactDOM.render(

    <BrowserRouter>
        <App />
        <GlobalStyles />
    </BrowserRouter>,
  document.getElementById('root')
);