import AppState from "../AppState/AppState";
import WebView from "../WebView/WebView";
import {updateColorPalette} from "./NavBarColor";
var NavBar = {
    container: document.getElementById('tabs'),
    tabElementMap: {}, //tabId: tab element

    getTab: function (tabId) {
        return NavBar.tabElementMap[tabId]
    },
    setActiveTab: function (tabId) {
        var activeTab = document.querySelector('.tab-item.active')

        if (activeTab) {
            activeTab.classList.remove('active')
        }

        var el = NavBar.getTab(tabId)
        el.classList.add('active')

        requestIdleCallback(function () {
            requestAnimationFrame(function () {
                el.scrollIntoView({
                    behavior: 'smooth'
                })
            })
        }, {
                timeout: 1500
            })
    },

    add:function(tabId) {
        var tab = AppState.get(tabId)
        var index = AppState.getIndex(tabId)
        var tabEl = NavBar.createElement(tab)
        NavBar.container.insertBefore(tabEl,NavBar.container.childNodes[index])
        NavBar.tabElementMap[tabId] = tabEl
        // switchToTab(tabId)
        
    },

    createElement:function(data) {
        var tabTitle = data.title || '加载中...'
        console.log(data)
        var tabEl = document.createElement('div')
        tabEl.className = 'tab-item'
        tabEl.setAttribute('data-tab', data.id)
        tabEl.title = tabTitle

        /* css :hover selectors are buggy when a webview is focused */
        tabEl.addEventListener('mouseenter', function (e) {
            this.classList.add('jshover')
        })

        tabEl.addEventListener('mouseleave', function (e) {
            this.classList.remove('jshover')
        })

        var vc = document.createElement('div')
        vc.className = 'tab-view-contents'
        // vc.appendChild(readerView.getButton(data.id))

        var pbContainer = document.createElement('div')
        pbContainer.className = 'progress-bar-container'
        vc.appendChild(pbContainer)
        var pb = document.createElement('div')
        pb.className = 'progress-bar p0'
        pb.hidden = true
        pbContainer.appendChild(pb)

        // icons

        var iconArea = document.createElement('span')
        iconArea.className = 'tab-icon-area'

        var closeTabButton = document.createElement('i')
        closeTabButton.classList.add('tab-close-button')
        closeTabButton.classList.add('fa')
        closeTabButton.classList.add('fa-times-circle')

        closeTabButton.addEventListener('click', function (e) {
            closeTab(data.id)
            
            // prevent the searchbar from being opened
            e.stopPropagation()
        })

        iconArea.appendChild(closeTabButton)


        vc.appendChild(iconArea)

        // title

        var title = document.createElement('span')
        title.className = 'title'
        title.textContent = tabTitle

        vc.appendChild(title)

        tabEl.appendChild(vc)

        // click to enter edit mode or switch to a tab
        tabEl.addEventListener('click', function (e) {
            switchToTab(data.id)
        })

        // tabEl.addEventListener('auxclick', function (e) {
        //     if (e.which === 2) { // if mouse middle click -> close tab
        //         // closeTab(data.id)
        //     }
        // })

        // tabEl.addEventListener('mousewheel', function (e) {
        //     if (e.deltaY > 65 && e.deltaX < 10 && Date.now() - lastTabDeletion > 650) { // swipe up to delete tabs
        //         lastTabDeletion = Date.now()

        //         /* tab deletion is disabled in focus mode */
        //         if (isFocusMode) {
        //             // showFocusModeError()
        //             return
        //         }

        //         var tab = this.getAttribute('data-tab')
        //         this.style.transform = 'translateY(-100%)'

        //         setTimeout(function () {
        //             // closeTab(tab)
        //         }, 150) // wait until the animation has completed
        //     }
        // })

        return tabEl
    },

    removeTab: function (tabId) {
        var tabEl = NavBar.getTab(tabId)
        if (tabEl) {
            // The tab does not have a coresponding .tab-item element.
            // This happens when destroying tabs from other task where this .tab-item is not present
            NavBar.container.removeChild(tabEl)
            delete NavBar.tabElementMap[tabId]
        }
    },


    rerenderTab: function (tabId) {
        var tabEl = NavBar.getTab(tabId)
        var tabData = AppState.get(tabId)

        var tabTitle = tabData.title || l('newTabLabel')

        tabEl.title = tabTitle
        var titleEl = tabEl.querySelector('.tab-view-contents .title')
        titleEl.textContent = tabTitle

        var secIcon = tabEl.getElementsByClassName('icon-tab-not-secure')[0]

        if (tabData.secure === false) {
            if (!secIcon) {
                var iconArea = tabEl.querySelector('.tab-icon-area')
                iconArea.insertAdjacentHTML('beforeend', "<i class='fa fa-unlock icon-tab-not-secure tab-info-icon' title='" + l('connectionNotSecure') + "'></i>")
            }
        } else if (secIcon) {
            secIcon.parentNode.removeChild(secIcon)
        }

        // update the star to reflect whether the page is bookmarked or not
        bookmarks.renderStar(tabId)
    },
}
export default NavBar


function switchToTab (id, options) {
    options = options || {}
  

    // set the tab's lastActivity to the current time
  
    if (AppState.getSelected()) {
        AppState.update(AppState.getSelected(), {
        lastActivity: Date.now()
      })
    }
  
    AppState.setSelected(id)
    NavBar.setActiveTab(id)
    WebView.setSelected(id)
  
    if (options.focusWebview !== false) {
      WebView.get(id).focus()
    }
  
    // updateColorPalette()
  
    // sessionRestore.save()
  
    // tabActivity.refresh()
  }

  function closeTab (tabId) {
    /* disabled in focus mode */
    // if (isFocusMode) {
    //   showFocusModeError()
    //   return
    // }
  console.log(tabId)
  console.log(AppState.getSelected())
    if (tabId === AppState.getSelected()) {
      var currentIndex = AppState.getIndex(AppState.getSelected())
      var nextTab = AppState.getAtIndex(currentIndex - 1) || AppState.getAtIndex(currentIndex + 1)
      console.log(nextTab)
      destroyTab(tabId)
        if (nextTab) {
            switchToTab(nextTab.id)
        } else {
            // addTab()
        }
    } else {
      destroyTab(tabId)
    }
  }

  /* destroys the webview and tab element for a tab */
function destroyTab (id) {
    NavBar.removeTab(id)
    AppState.destroy(id) // remove from state - returns the index of the destroyed tab
    WebView.destroy(id) // remove the webview
}