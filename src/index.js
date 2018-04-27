// import React from 'react'
// import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux'
// import store, { history } from './store'
// import App from './Containers/App.js'
// import registerServiceWorker from './registerServiceWorker';
// import './index.css'

// const target = document.querySelector('#root')

// render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <div>
//       <BrowserRouter>
//         <div>
//             <App>
//                 <div>
//                     <Switch>
//                         <Route exact path="/" component={Home} />
//                         <Route path="/women" component={Women} />
//                         <Route path="/men" component={Men} />
//                         <Route path="/cart" component={Cart} />
//                     </Switch>
//                 </div>
//             </App>
//         </div>
//     </BrowserRouter>
//       </div>
//     </ConnectedRouter>
//   </Provider>,
//   target
// )
// registerServiceWorker();


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
                    </Switch>
                </div>
            </App>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
