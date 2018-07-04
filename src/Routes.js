import React from 'react'
import {
  Router,
  // BrowserRouter as Router,
  Route,
  Link,
  hashRouter
} from 'react-router-dom'
import history from "./History";
import DefaultLayout from "./components/layout/DefaultLayout";
import App from './App';
import { listCase,CaseDetail } from "./modules/case";
import Index from "./modules/index/index";


const Routes = () => (
    // <Router>
    <Router history={history}> 
      <div>
        <Route exact path="/" component={Index} />
        <DefaultLayout exact path="/case" component={listCase}/> 
        <DefaultLayout exact path="/case/detail" component = {CaseDetail} />
      </div>
    </Router>
  )

  export default Routes;