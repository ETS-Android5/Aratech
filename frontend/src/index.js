import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import './styles/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import uikit
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
