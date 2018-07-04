import React,{ Component } from "react";
import { Link } from "react-router-dom";
const WebView = require('react-electron-web-view');
const electron = window.electron
const {dialog,BrowserWindow,BrowserView,shell,webview} = electron.remote;

class Index extends Component {
    props(){
        super.props()
        // const webview = document.getElementById('foo')
        // console.log(webview);
        
        // webview.addEventListener('new-window', (e) => {
        //     const protocol = require('url').parse(e.url).protocol
        //     console.log(protocol)
        //     if (protocol === 'http:' || protocol === 'https:') {
        //         //shell.openExternal(e.url)
        //         window.open(e.url)
                
        //     }
        // });
    }
    componentDidMount() {
        const webview = document.getElementById('foo')
        const indicator = document.getElementById('indicator')

        const loadstart = () => {
            indicator.innerText = 'loading...'
        }

        const loadstop = () => {
            indicator.innerText = ''
        }

        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
        webview.addEventListener('dom-ready', () => {
            webview.openDevTools()
            // if (!webContents) {
            //     webContents = webview.getWebContents();
            //     webContents.on('dom-ready', e => {
            //       console.log('webContents dom-ready');
            //     });
            //   }
        })
    }

    render() {
        return (
            <div>

                <Link 
                to={{
                  pathname: '/case'
                }}> 
                    <webview id="foo" src="http://localhost:4008/case" style={{display:"inline-flex",width:"640px", height:"480px"}} webpreferences="nodeIntegration=no, nativeWindowOpen=true" allowpopups></webview>

                </Link>
                <div id="indicator"></div>
            </div>
            
        )
    }
}
export default Index

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//         <div className="AppContent">
            
//         </div>
//     );
//   }
// }

// export default App;