import React,{ Component } from "react";
const TabGroup = require("electron-tabs");
const  {dialog,BrowserWindow,BrowserView,shell,webview,ipcMain}  = window.require("electron").remote


import tabBar from "../../components/navbar/tabBar";
import tabState from "../../components/navbar/tabState"

class Index extends Component {
    props(){
        super.props()
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

        // const webview = document.getElementById('foo')
        webview.addEventListener('ipc-message', (event) => {
            console.log(event.channel)
            this.openViews(event.channel)
        })
    }

    openViews(itemId) {
        const tab = document.getElementById('tabs')
        // var newTab = tabs.add({
        //     url: e.url,
        //     private: tabs.get(tab).private // inherit private status from the current tab
        //   }, 0)
        // tabBar.addTab(newTab)
        // console.log(tabView);
        tabBar.addTab(currentTask.tabs.add(), {
            leaveEditMode: false // we know we aren't in edit mode yet, so we don't have to leave it
        })
        console.log(itemId)
    }

    render() {
        return (
            <div>
                <div id="navbar" className="theme-background-color theme-text-color windowDragHandle" tabindex="-1">
                    <div id="tabs">
                    </div>
                </div>

                <div id="webviews">
                    <div id="leftArrowContainer" className="arrow-indicator">
                        <i id="leftArrow" className="fa fa-arrow-left arrow"></i>
                    </div>
                    <div id="rightArrowContainer" className="arrow-indicator">
                        <i id= "rightArrow" className="fa fa-arrow-right arrow"></i>
                    </div>
                    <webview id="foo" src="http://localhost:4008/case" style={{display:"inline-flex",width:"640px", height:"480px"}} nodeintegration="true"  allowpopups></webview>
                </div>
                

                    {/* webpreferences="nodeIntegration=true,webSecurity: false,javascript: true,plugins: true" */}
                    
            </div>
            
        )
    }
}
export default Index