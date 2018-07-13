import React,{ Component } from "react";
const TabGroup = require("electron-tabs");
const  {dialog,BrowserWindow,BrowserView,shell,webview}  = window.require("electron").remote
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
            
        }

        const loadstop = () => {
            
        }

        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
        webview.addEventListener('dom-ready', () => {
            webview.openDevTools()
        })
    }

    render() {
        return (
            <div>
                    {/* webpreferences="nodeIntegration=true,webSecurity: false,javascript: true,plugins: true" */}
                    <webview id="foo" src="http://localhost:4008/case" style={{display:"inline-flex",width:"640px", height:"480px"}} nodeintegration="true"  allowpopups></webview>
            </div>
            
        )
    }
}
export default Index