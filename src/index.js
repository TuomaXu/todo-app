import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { MemoryRouter } from "react-router-dom";


ReactDOM.render(
    <MemoryRouter>
        <App />
    </MemoryRouter>,
    document.getElementById('root')
);
registerServiceWorker();
