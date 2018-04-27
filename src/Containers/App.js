
import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Header from './Header';
import Item from './Item';
const App = () => (
  <div>
    <Header/>
    <main className="container mt-4">
      <Route exact path="/" component={Home} />
      <Route exact path="/item" component={Item} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App;
