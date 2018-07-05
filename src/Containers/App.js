import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Route} from 'react-router-dom';
import Home from './Home'
import EL from './EnsuredLoggedInContainer'
import Header from './Header';
import Item from './Item';
import ItemDesc from './ItemDesc';
import EventDesc from './EventDesc';
import Items from './Items';
import Favourites from './Favourites';
import FavouritesEvent from './FavouritesEvent';
import Login from './User';
import Loader from './Loader';
import Sales from './Sales';
import Information from './Information';
import Event from './Event';
import Profile from './Profile';
import Account from './Account';
import OtherAccount from './OtherAccount';
import Products from './Products';
import Footer from './Footer';
import Homesale from './Homesale';
import SearchResults from './SearchResults';
import Events from './Events';
import Cookies from 'universal-cookie';
import store from '../store';
import {login,loadAllUsers} from '../modules/user';

const cookies = new Cookies(); 

if(cookies.get('login')){
  store.dispatch({
    type:"global/START_LOADING"
  })  
  store.dispatch(login(cookies.get('login')));
  store.dispatch({
    type:"global/STOP_LOADING"
  })
}

   
const App = () => (
  <div className="body-container">
  <Loader/>
    <Header/>
    <main className="container mt-4" style={{paddingBottom:"100px"}}>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/sales" component={Sales} />
      <Route exact path="/item-desc/:id" component={ItemDesc} />
      <Route exact path="/event-desc/:id" component={EventDesc} />
      <Route exact path="/search/:qParam" component={SearchResults} />
      <EL>
        <Route exact path="/items" component={Items} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/favourite-events" component={FavouritesEvent} />
        <Route exact path="/my-events" component={Events} />
        <Route exact path="/homesale" component={Homesale} />
        <Route exact path="/event" component={Event} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/account/:id" component={OtherAccount} />
        <Route exact path="/information" component={Information} />
        <Route exact path="/item" component={Item} />        
      </EL>
    </main>
    <Footer />
  </div>
)

export default App;
