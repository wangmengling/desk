import React,{ Component } from "react";
const TabGroup = require("electron-tabs");
const  {dialog,BrowserWindow,BrowserView,shell,webview,ipcMain}  = window.require("electron").remote

import API from "../../../config/API.config";
import NavBar from "../../components/Navigation/NavBar";
import "./tabBar.css"
import "./windowsCaptionButtons.css"
import "./webviews.css"
import "./base.css"
import AppState from "../../components/AppState/AppState";
import WebView from "../../components/WebView/WebView";
class Index extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        //创建默认页面
        var url =  API.api.baseUrl + "/case"
        var nav = {url:url,title:"列表",id:"DeskList"}
        this.openViews(nav)
        setTimeout(() => {
            this.load()
        }, 1);
    }

    //加载新页面
    load() {
        const webview = document.getElementById('DeskList')
        const loadstart = () => {
            
        }
        const loadstop = () => {
            
        }
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
        webview.addEventListener('dom-ready', () => {
            webview.openDevTools()
        })
        webview.addEventListener('ipc-message', (event) => {
            console.log(event.channel)
            var url =  API.api.baseUrl + "/case/detail?caseId=" + event.channel._id
            var nav = {url:url,title:event.channel.Title}
            this.openViews(nav)
        })
    }

    openViews(nav) {
        var nabbarId = AppState.add(nav)
        NavBar.container = document.getElementById('tabs')
        NavBar.add(nabbarId)
        WebView.container = document.getElementById('webviews'),
        WebView.add(nabbarId)
        NavBar.setActiveTab(nabbarId)

    }

    render() {
        return (
            <div className="dark-theme">
                <div id="navbar" className="dark-theme theme-background-color theme-text-color windowDragHandle" tabindex="-1">
                    <div id="tabs">
                    </div>
                </div>
                <div id="webviews">
                    {/* <webview id="foo" src="http://localhost:4008/case"  tabindex="-1" nodeintegration="true" data-tab={this.state.firstNabId} allowpopups ></webview> */}
                </div>
                {/* webpreferences="nodeIntegration=true,webSecurity: false,javascript: true,plugins: true" */}   
            </div>
        )
    }
}
export default Index