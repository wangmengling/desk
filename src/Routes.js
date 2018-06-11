import React,{Component} from 'react'
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

// class App extends Component {
//   render() {
//     return (
//         <div className="AppContent">
            
//         </div>
//     );
//   }
// }

const Routes = () => (
    // <Router>
    <Router history={history}> 
      <div>
        <DefaultLayout exact path="/" component={listCase}/> 
        <DefaultLayout exact path="/case/detail" component = {CaseDetail} />
        {/* <Route exact path="/" component={App}/> */}
      </div>
    </Router>
  )

  export default Routes;