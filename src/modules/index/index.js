import React,{ Component } from "react";
const TabGroup = require("electron-tabs");
const  {dialog,BrowserWindow,BrowserView,shell,webview,ipcMain}  = window.require("electron").remote

import API from "../../../config/API.config";
import NavBar from "../../components/Navigation/NavBar";
import "./index.less"
import "./tabBar.css"
import "./windowsCaptionButtons.css"
import "./webviews.css"
import AppState from "../../components/AppState/AppState";
import WebView from "../../components/WebView/WebView";

class Index extends Component {
    props(){
        super.props()
    }
    componentDidMount() {
        const webview = document.getElementById('foo')
        // const indicator = document.getElementById('indicator')

        const loadstart = () => {
            
        }

        const loadstop = () => {
            
        }

        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
        webview.addEventListener('dom-ready', () => {
            webview.openDevTools()
        })

        // const webview = document.getElementById('foo')
        webview.addEventListener('ipc-message', (event) => {
            console.log(event.channel)
            this.openViews(event.channel)
        })
    }

    openViews(itemId) {
        // NavBar.add()
        var url =  API.api.case.detailById + "?caseId=" + itemId
        var nav = {url:url}
        var nabbarId = AppState.add(nav)
        NavBar.container = document.getElementById('tabs')
        NavBar.add(nabbarId)
        console.log(NavBar.container)
        console.log(NavBar.createElement)
        WebView.container = document.getElementById('webviews'),
        WebView.add(nabbarId)
    }

    render() {
        return (
            <div>
                {/* <button id="switch-task-button" className="fa fa-bars navbar-action-button theme-text-color windowDragHandle" data-label="viewTasks"></button> */}

                <div className="windows-drag-area"></div>
                <div className="windows-caption-buttons">
                    <div className="element caption-minimise">
                        <svg>
                            <line x1="1" y1="5.5" x2="11" y2="5.5" />
                        </svg>
                    </div>
                    <div className="element caption-maximise">
                        <svg>
                            <rect x="1.5" y="1.5" width="9" height="9" />
                        </svg>
                    </div>
                    <div className="element caption-restore">
                        <svg>
                            <rect x="1.5" y="3.5" width="7" height="7" />
                            <polyline points="3.5,3.5 3.5,1.5 10.5,1.5 10.5,8.5 8.5,8.5" />
                        </svg>
                    </div>
                    <div className="element caption-close">
                        <svg>
                            <path d="M1,1 l 10,10 M1,11 l 10,-10" />
                        </svg>
                    </div>
                </div>
                <div id="navbar" className="theme-background-color theme-text-color windowDragHandle" tabindex="-1">
                    <div id="tabs">
                        <div className="tab-item fade" data-tab="38181023441599370" title="Yes+青年公寓(会展中心店)电话,地址,营业时间,人均,评价,优惠,代金券,相册--百度糯米">
                        
                        <div className="tab-view-contents">
                        <div className="progress-bar-container">
                        <div className="progress-bar p0" hidden="">
                        </div>
                        </div>
                        <span className="tab-icon-area">
                        <i className="tab-close-button fa fa-times-circle"></i>
                        </span>
                        <span className="title">Yes+青年公寓(会展中心店)电话,地址,营业时间,人均,评价,优惠,代金券,相册--百度糯米</span>
                        </div>
                        </div>
                    </div>
                </div>

                {/* <div id="webviews">
                    <div id="leftArrowContainer" className="arrow-indicator">
                        <i id="leftArrow" className="fa fa-arrow-left arrow"></i>
                    </div>
                    <div id="rightArrowContainer" className="arrow-indicator">
                        <i id= "rightArrow" className="fa fa-arrow-right arrow"></i>
                    </div>
                     style={{display:"inline-flex",width:"640px", height:"480px"}}
                    <webview id="foo" src="http://localhost:4008/case" className="hidden" tabindex="-1" nodeintegration="true"  allowpopups aria-hidden="true"></webview>
                    <webview  tabindex="-1"  src="https://www.baidu.com/"    data-tab="44424510246504890" className="" guestinstance="3" last-load-event="1531920121350"></webview>
                    <webview  src="http://www.ifeng.com/"   data-tab="66905130000109110" className="hidden" tabindex="-1" guestinstance="1" last-load-event="1531920237059" ></webview>
                </div> */}
                <div id="webviews">
                    <webview id="foo" src="http://localhost:4008/case"  tabindex="-1" nodeintegration="true"  allowpopups ></webview>
                    <webview  src="https://www.baidu.com/" data-tab="44424510246504890" className="hidden" tabindex="-1" guestinstance="1" last-load-event="1531996614732" aria-hidden="true" nodeintegration="true"  allowpopups></webview>
                    <webview tabindex="-1"  src="http://www.ifeng.com/" data-tab="66905130000109110" className="hidden" guestinstance="2" last-load-event="1531996678324" aria-hidden="true"></webview>
                    {/* <webview id="foo" tabindex="-1"  src="http://localhost:4008/case" data-tab="35038458853567932" className="" guestinstance="3"  nodeintegration="true"  allowpopups></webview> */}
                </div>
                
                    {/* webpreferences="nodeIntegration=true,webSecurity: false,javascript: true,plugins: true" */}
                    
            </div>
            
        )
    }
}
export default Index