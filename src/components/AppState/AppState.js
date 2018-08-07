var AppState = {
    contents:[],
    add: function (tab, index) {
      // make sure the tab exists before we create it
      if (!tab) {
        var tab = {}
      }
  
      var tabId = String(tab.id || Math.round(Math.random() * 100000000000000000)) // you can pass an id that will be used, or a random one will be generated.
  
      var newTab = {
        url: tab.url || '',
        title: tab.title || '',
        id: tabId,
        lastActivity: tab.lastActivity || Date.now(),
        secure: tab.secure,
        private: tab.private || false,
        readerable: tab.readerable || false,
        backgroundColor: tab.backgroundColor,
        foregroundColor: tab.foregroundColor,
        selected: tab.selected || false
      }
  
      if (index) {
        this.contents.splice(index, 0, newTab)
      } else {
        this.contents.push(newTab)
      }
  
      return tabId
    },
    update: function (id, data) {
      if (!this.has(id)) {
        throw new ReferenceError('Attempted to update a tab that does not exist.')
      }
      var index = -1
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].id === id) {
          index = i
        }
      }
      for (var key in data) {
        if (data[key] === undefined) {
          throw new ReferenceError('Key ' + key + ' is undefined.')
        }
        this.contents[index][key] = data[key]
      }
    },
    // destroy: function (id) {
    //   for (var i = 0; i < this.length; i++) {
    //     if (this[i].id === id) {
    //       tasks.getTaskContainingTab(id).tabHistory.push(this[i])
    //       this.splice(i, 1)
    //       return i
    //     }
    //   }
    //   return false
    // },
    destroyAll: function () {
      // this = [] doesn't work, so set the length of the array to 0 to remove all of the itemss
      this.length = 0
    },
    get: function (id) {
      if (!id) { // no id provided, return an array of all tabs
        // it is important to deep-copy the tab objects when returning them. Otherwise, the original tab objects get modified when the returned tabs are modified (such as when processing a url).
        var tabsToReturn = []
        for (var i = 0; i < this.contents.length; i++) {
          tabsToReturn.push(JSON.parse(JSON.stringify(this.contents[i])))
        }
        return tabsToReturn
      }
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].id === id) {
          return JSON.parse(JSON.stringify(this.contents[i]))
        }
      }
      return undefined
    },
    has: function (id) {
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].id === id) {
          return true
        }
      }
      return false
    },
    getIndex: function (id) {
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].id === id) {
          return i
        }
      }
      return -1
    },
    getSelected: function () {
      console.log(this.contents)
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].selected) {
          return this.contents[i].id
        }
      }
      return null
    },
    getAtIndex: function (index) {
      return this.contents[index] || undefined
    },
    setSelected: function (id) {
      if (!this.has(id)) {
        throw new ReferenceError('Attempted to select a tab that does not exist.')
      }
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].id === id) {
          this.contents[i].selected = true
        } else {
          this.contents[i].selected = false
        }
      }
      console.log(this.contents)
    },
    count: function () {
      return this.contents.length
    },
    isEmpty: function () {
      if (!this.contents || this.contents.length === 0) {
        return true
      }
  
      if (this.contents.length === 1 && (!this.contents[0].url || this.contents[0].url === 'about:blank')) {
        return true
      }
  
      return false
    },
    destroy: function (id) {
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].id === id) {
          // tasks.getTaskContainingTab(id).tabHistory.push(this[i])
          this.contents.splice(i, 1)
          return i
        }
      }
      return false
    },
  }
  
  function getRandomId () {
    return Math.round(Math.random() * 100000000000000000)
  }

  export default AppState