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
<<<<<<< HEAD
<<<<<<< HEAD
import { listCase,CaseDetail } from "./modules/case";

// class App extends Component {
//   render() {
//     return (
//         <div className="AppContent">
            
//         </div>
//     );
//   }
// }
=======
import { List } from "./modules/case";
>>>>>>> parent of b05d8e5... webpack 修改
=======
import { List } from "./modules/case";
>>>>>>> parent of b05d8e5... webpack 修改

const Routes = () => (
    // <Router>
    <Router history={history}> 
      <div>
<<<<<<< HEAD
<<<<<<< HEAD
        <DefaultLayout exact path="/" component={listCase}/> 
        <DefaultLayout exact path="/case/detail" component = {CaseDetail} />
        {/* <Route exact path="/" component={App}/> */}
=======
        <DefaultLayout exact path="/" component={List}/>
>>>>>>> parent of b05d8e5... webpack 修改
=======
        <DefaultLayout exact path="/" component={List}/>
>>>>>>> parent of b05d8e5... webpack 修改
      </div>
    </Router>
  )

  export default Routes;