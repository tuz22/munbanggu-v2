import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ScrollTop from './components/ScrollTop';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './store/index';

import './index.css';
import App from './App';

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <PersistGate loading={null} persistor={persistor}>
                <ScrollTop />
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

reportWebVitals();
