import {  } from "./tabState";
import tabBar from "../../components/navbar/tabBar";
// import {  } from "./api-wrapper";
const {app}  = window.require("electron").remote
var sessionRestore = {
  save: function () {
    var data = {
      version: 2,
      state: JSON.parse(JSON.stringify(tabState))
    }

    // save all tabs that aren't private

    for (var i = 0; i < data.state.tasks.length; i++) {
      data.state.tasks[i].tabs = data.state.tasks[i].tabs.filter(function (tab) {
        return !tab.private
      })
    }

    localStorage.setItem('sessionrestoredata', JSON.stringify(data))
  },
  restore: function () {
    var savedStringData = localStorage.getItem('sessionrestoredata')

    try {
      // first run, show the tour
      if (!savedStringData) {
        tasks.setSelected(tasks.add()) // create a new task

        var newTab = currentTask.tabs.add({
          url: 'https://minbrowser.github.io/min/tour'
        })
        addTab(newTab, {
          enterEditMode: false
        })
        return
      }

      console.log(savedStringData)

      var data = JSON.parse(savedStringData)

      // the data isn't restorable
      if ((data.version && data.version !== 2) || (data.state && data.state.tasks && data.state.tasks.length === 0)) {
        tasks.setSelected(tasks.add())

        addTab(currentTask.tabs.add(), {
          leaveEditMode: false // we know we aren't in edit mode yet, so we don't have to leave it
        })
        return
      }

      // add the saved tasks

      data.state.tasks.forEach(function (task) {
        // restore the task item
        tasks.add(task)
      })

      // switch to the previously selected tasks

      switchToTask(data.state.selectedTask)

      if (currentTask.tabs.isEmpty()) {
        tabBar.enterEditMode(currentTask.tabs.getSelected())
      }
    } catch (e) {
      // an error occured while restoring the session data

      console.error('restoring session failed: ', e)

      // var backupSavePath = require('path').join(app.getPath('userData'), 'sessionRestoreBackup-' + Date.now() + '.json')

      // require('fs').writeFileSync(backupSavePath, savedStringData)

      // // destroy any tabs that were created during the restore attempt
      // initializeTabState()

      // // create a new tab with an explanation of what happened
      // var newTask = tasks.add()
      // var newSessionErrorTab = tasks.get(newTask).tabs.add({
      //   url: 'file://' + __dirname + '/pages/sessionRestoreError/index.html?backupLoc=' + encodeURIComponent(backupSavePath)
      // })

      // switchToTask(newTask)
      // switchToTab(newSessionErrorTab)
    }
  }
}

// TODO make this a preference

sessionRestore.restore()

setInterval(sessionRestore.save, 12500)


/* common actions that affect different parts of the UI (webviews, tabstrip, etc) */

/* loads a page in a webview */

function navigate (tabId, newURL) {
  newURL = urlParser.parse(newURL)

  tabs.update(tabId, {
    url: newURL
  })

  webviews.update(tabId, newURL)

  tabBar.leaveEditMode({
    blur: true
  })
}

/* creates a new task */

function addTask () {
  tasks.setSelected(tasks.add())
  taskOverlay.hide()

  tabBar.rerenderAll()
  addTab()
}

/* creates a new tab */

function addTab (tabId, options) {
  /*
  options

    options.focus - whether to enter editing mode when the tab is created. Defaults to true.
    options.openInBackground - whether to open the tab without switching to it. Defaults to false.
    options.leaveEditMode - whether to hide the searchbar when creating the tab
  */
  options = options || {}

  if (options.leaveEditMode !== false) {
    tabBar.leaveEditMode() // if a tab is in edit-mode, we want to exit it
  }

  tabId = tabId || tabs.add()

  tabBar.addTab(tabId)
  webviews.add(tabId)

  // open in background - we don't want to enter edit mode or switch to tab

  if (options.openInBackground) {
    return
  }

  switchToTab(tabId, {
    focusWebview: false
  })
  if (options.enterEditMode !== false) {
    tabBar.enterEditMode(tabId)
  }
}

/* destroys a task object and the associated webviews */

function destroyTask (id) {
  var task = tasks.get(id)

  task.tabs.forEach(function (tab) {
    webviews.destroy(tab.id)
  })

  tasks.destroy(id)
}

/* destroys the webview and tab element for a tab */
function destroyTab (id) {
  tabBar.removeTab(id)
  tabs.destroy(id) // remove from state - returns the index of the destroyed tab
  webviews.destroy(id) // remove the webview
}

/* destroys a task, and either switches to the next most-recent task or creates a new one */

function closeTask (taskId) {
  destroyTask(taskId)

  if (taskId === currentTask.id) {
    // the current task was destroyed, find another task to switch to

    if (tasks.get().length === 0) {
      // there are no tasks left, create a new one
      return addTask()
    } else {
      // switch to the most-recent task

      var recentTaskList = tasks.get().map(function (task) {
        return { id: task.id, lastActivity: tasks.getLastActivity(task.id) }
      })

      // sort the tasks based on how recent they are
      recentTaskList.sort(function (a, b) {
        return b.lastActivity - a.lastActivity
      })

      return switchToTask(recentTaskList[0].id)
    }
  }
}

/* destroys a tab, and either switches to the next tab or creates a new one */
function closeTab (tabId) {
  /* disabled in focus mode */
  if (isFocusMode) {
    showFocusModeError()
    return
  }

  if (tabId === tabs.getSelected()) {
    var currentIndex = tabs.getIndex(tabs.getSelected())
    var nextTab = tabs.getAtIndex(currentIndex - 1) || tabs.getAtIndex(currentIndex + 1)

    destroyTab(tabId)

    if (nextTab) {
      switchToTab(nextTab.id)
    } else {
      addTab()
    }
  } else {
    destroyTab(tabId)
  }
}

/* changes the currently-selected task and updates the UI */

function switchToTask (id) {
  tasks.setSelected(id)

  tabBar.rerenderAll()

  var taskData = tasks.get(id)

  if (taskData.tabs.length > 0) {
    var selectedTab = taskData.tabs.getSelected()

    // if the task has no tab that is selected, switch to the most recent one

    if (!selectedTab) {
      selectedTab = taskData.tabs.get().sort(function (a, b) {
        return b.lastActivity - a.lastActivity
      })[0].id
    }

    switchToTab(selectedTab)
  } else {
    addTab()
  }
}

/* switches to a tab - update the webview, state, tabstrip, etc. */

function switchToTab (id, options) {
  options = options || {}

  /* tab switching disabled in focus mode */
  if (isFocusMode) {
    showFocusModeError()
    return
  }

  tabBar.leaveEditMode()

  // set the tab's lastActivity to the current time

  if (tabs.getSelected()) {
    tabs.update(tabs.getSelected(), {
      lastActivity: Date.now()
    })
  }

  tabs.setSelected(id)
  tabBar.setActiveTab(id)
  webviews.setSelected(id)

  if (options.focusWebview !== false) {
    webviews.get(id).focus()
  }

  updateColorPalette()

  sessionRestore.save()

  tabActivity.refresh()
}