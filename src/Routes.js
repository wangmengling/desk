import React from 'react'
import {
//   Router,
  BrowserRouter as Router,
  Route,
  Link,
  hashRouter
} from 'react-router-dom'
import history from "./History";
import App from './App';

const Routes = () => (
    // <Router>
    <Router history={history}> 
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </Router>
  )

  export default Routes;