import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.test';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Home from './components/home/Home';
import Women from './components/women/Women';
import Men from './components/men/Men';
import Cart from './components/cart/Cart';
import Profile from './components/Profile';
import Information from './components/Information';
import Account from './components/Account';
import Event from './components/Event';
import Item from './components/Item';

const routes = (
    <BrowserRouter>
        <div>
            <App>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/women" component={Women} />
                        <Route path="/men" component={Men} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/information" component={Information} />
                        <Route path="/account" component={Account} />
                        <Route path="/event" component={Event} />
                        <Route path="/item" component={Item} />
                    </Switch>
                </div>
            </App>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
