import React from 'react'
import {
//   Router,
  BrowserRouter as Router,
  Route,
  Link,
  hashRouter
} from 'react-router-dom'
import history from "./History";
import DefaultLayout from "./components/layout/DefaultLayout";
import App from './App';
import { List } from "./modules/case";

const Routes = () => (
    // <Router>
    <Router history={history}> 
      <div>
        <DefaultLayout exact path="/" component={List}/>
      </div>
    </Router>
  )

  export default Routes;