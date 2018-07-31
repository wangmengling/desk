/* implements selecting WebView, switching between them, and creating new ones. */
import AppState from "../AppState/AppState";
import NavBar from "../Navigation/NavBar";
var remote = window.require("electron").remote
// the permissionRequestHandler used for WebView
function pagePermissionRequestHandler (webContents, permission, callback) {
    if (permission === 'notifications' || permission === 'fullscreen') {
      callback(true)
    } else {
      callback(false)
    }
  }
  
  // set the permissionRequestHandler for non-private tabs
  
  remote.session.defaultSession.setPermissionRequestHandler(pagePermissionRequestHandler)
  
  // called whenever the page url changes
  
  function onPageLoad (e) {
    var _this = this
    setTimeout(function () { // TODO convert to arrow function
      /* add a small delay before getting these attributes, because they don't seem to update until a short time after the did-finish-load event is fired. Fixes #320 */
  
      var tab = _this.getAttribute('data-tab')
      var url = _this.getAttribute('src') // src attribute changes whenever a page is loaded
  
      // if the page is an error page, the URL is really the value of the "url" query parameter
      if (url.startsWith(WebView.internalPages.error) || url.startsWith(WebView.internalPages.crash)) {
        url = new URLSearchParams(new URL(url).search).get('url')
      }
  
      if (url.indexOf('https://') === 0 || url.indexOf('about:') === 0 || url.indexOf('chrome:') === 0 || url.indexOf('file://') === 0) {
        AppState.update(tab, {
          secure: true,
          url: url
        })
      } else {
        AppState.update(tab, {
          secure: false,
          url: url
        })
      }
  
      NavBar.rerenderTab(tab)
    }, 0)
  }
  
var WebView = {
    container: document.getElementById('webviews'),
    elementMap: {}, // tabId: webview
    internalPages: {
      crash: 'file://' + __dirname + '/pages/crash/index.html',
      error: 'file://' + __dirname + '/pages/error/index.html'
    },
    events: [],
    IPCEvents: [],
    bindEvent: function (event, fn, useWebContents) {
      WebView.events.push({
        event: event,
        fn: fn,
        useWebContents: useWebContents
      })
    },
    bindIPC: function (name, fn) {
      WebView.IPCEvents.push({
        name: name,
        fn: fn
      })
    },
    getDOM: function (options) {
      var w = document.createElement('webview')
    //   w.setAttribute('preload', 'webviewPreload.min.js')
  
      if (options.url) {
        // w.setAttribute('src', urlParser.parse(options.url))
        w.setAttribute('src',options.url)
      }
  
      w.setAttribute('data-tab', options.tabId)
      w.setAttribute('nodeintegration', true)
      // webview events
  
      WebView.events.forEach(function (ev) {
        if (ev.useWebContents) { // some events (such as context-menu) are only available on the webContents rather than the webview element
          w.addEventListener('did-attach', function () {
            this.getWebContents().on(ev.event, function () {
              ev.fn.apply(w, arguments)
            })
          })
        } else {
          w.addEventListener(ev.event, ev.fn)
        }
      })
  
      w.addEventListener('did-navigate-in-page', onPageLoad)
      w.addEventListener('did-finish-load', () => {
        w.send('detailData', 'whoooooooh!')
      })
  
      w.addEventListener('close', function (e) {
        closeTab(this.getAttribute('data-tab'))
      })
  
      w.addEventListener('ipc-message', function (e) {
        var w = this
        var tab = this.getAttribute('data-tab')
        
        WebView.IPCEvents.forEach(function (item) {
          if (item.name === e.channel) {
            item.fn(w, tab, e.args)
          }
        })
      })
      
  
      return w
    },
    add: function (tabId) {
      var tabData = AppState.get(tabId)
  
      var webviewDom = WebView.getDOM({
        tabId: tabId,
        url: tabData.url
      })
  
      WebView.elementMap[tabId] = webviewDom
  
      WebView.container.appendChild(webviewDom)
  
      return webviewDom
    },
    setSelected: function (id) {
      var webviewEls = document.getElementsByTagName('webview')
      for (var i = 0; i < webviewEls.length; i++) {
        webviewEls[i].classList.add('hidden')
        webviewEls[i].setAttribute("aria-hidden", "true")
      }
  
      var wv = WebView.get(id)
  
      if (!wv) {
        wv = WebView.add(id)
      }
  
      wv.classList.remove('hidden')
      wv.removeAttribute("aria-hidden")
    },
    update: function (id, url) {
      WebView.get(id).setAttribute('src', urlParser.parse(url))
    },
    destroy: function (id) {
      var w = WebView.elementMap[id]
      if (w) {
        var partition = w.getAttribute('partition')
        if (partition) {
          remote.session.fromPartition(partition).destroy()
        }
        w.parentNode.removeChild(w)
      }
      delete WebView.elementMap[id]
    },
    get: function (id) {
      return WebView.elementMap[id]
    }
  } 
  export default WebView