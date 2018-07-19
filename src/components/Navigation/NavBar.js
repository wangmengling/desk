import AppState from "../AppState/AppState";
var NavBar = {
    container: document.getElementById('tabs'),
    tabElementMap: {}, //tabId: tab element

    add:function(tabId) {
        var tab = AppState.get(tabId)
        var index = AppState.getIndex(tabId)
        console.log(tab)
        var tabEl = NavBar.createElement(tab)
        NavBar.container.insertBefore(tabEl,NavBar.container.childNodes[index])
        NavBar.tabElementMap[tabId] = tabEl
    },

    createElement:function(data) {
        var tabTitle = data.title || 'newTabLabel'

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
            // closeTab(data.id)

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
        // tabEl.addEventListener('click', function (e) {
        //     if (tabs.getSelected() !== data.id) { // else switch to tab if it isn't focused
        //         switchToTab(data.id)
        //     } else { // the tab is focused, edit tab instead
        //         NavBar.enterEditMode(data.id)
        //     }
        // })

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