import 'react-app-polyfill/ie9';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {View as Map} from './Map';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Map/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
