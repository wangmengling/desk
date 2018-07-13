import React, { Component } from "react";
import Filter from "./Filter";
import { withRouter, Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import "./ListCase.less";
import {  List, Card } from 'antd';
import { Meta } from "antd/lib/list/Item";
import CaseBlock from "./CaseBlock";
import { observer } from "mobx-react";
import API from "../../../config/API.config";
// const WebView = require('react-electron-web-view');
// import { resolve } from "dns";

// const electron = window.electron
// const {dialog,BrowserWindow,BrowserView,shell} = electron.remote;
// const {BrowserWindow,BrowserView} = require('electron').remote
// var remote = require('electron').remote;
// var BrowserView = remote.BrowserView;
// var BrowserWindow = remote.BrowserWindow;
// const path = require('path')
// const TabGroup = require("electron-tabs");

@observer
class ListCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bordered: true,
      pagination: true,
      size: 'default',
      rowSelection: {},
      scroll: undefined,
    }
    this.props.store.pageSize = 10;
    this.props.store.pageIndex = 0;
    // this.toDetailAction = this.toDetailAction.bind(this)
  }

  componentWillMount() {
    this.props.store.pageIsMoreData = true;
    this.props.store.list();
  }

  handleInfiniteOnLoad = () => {
    let data = this.props.store.dataList;
    // this.props.store.loading = true;
    if (data.length >= this.props.store.count) {
      message.warning('Infinite List loaded all');
      this.props.store.hasMore = false;
      this.props.store.loading = false;
      return;
    }
    this.props.store.pageIndex += 1;
    this.props.store.list();
  }

  toDetailAction(itemId){
    // let win = new BrowserWindow({
    //   width: 800, 
    //   height: 600,
    //   webPreferences: {
    //       javascript: true,
    //       plugins: true,
    //       nodeIntegration: false, // 不集成 Nodejs
    //       webSecurity: false,
    //       preload: path.resolve('file://',__dirname, '../../../public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    //   }
    //   })
    // win.on('closed', () => {
    //   win = null
    // })
    // console.log(path.resolve( '../../../public/renderer.js'))
    // let view = new BrowserView({
    //   webPreferences: {
    //     nodeIntegration: false
    //   }
    // })
    // win.setBrowserView(view)
    // view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    // view.webContents.loadURL(`http://localhost:4008/case/detail?caseId=${itemId}`)
  }

  render() {
    return (
      <div className="CaseList">
        <div className="CaseFilter">
          <Filter />
          {/* 大发送到发 */}
        </div>
        <div className="CaseContent">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          // hasMore={!this.props.store.loading && this.props.store.hasMore}
          useWindow={false}
          className="CaseScrollView"
        >
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={this.props.store.dataList}
            // dataSource={data}
            renderItem={item => (
              <List.Item>
                <Link 
                to={{
                  pathname: '/case/detail',
                  search: `?caseId=${item._id}`,
                  // hash: '#the-hash',
                  state: { caseId: item._id }
                }}>
                  <Card
                    hoverable
                    cover={<img src={API.api.imgUrl+item.ThumbUrl} />}
                    // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    // onClick={this.toDetailAction.bind(this,item._id)}
                  >
                    <Meta
                      title={item.Title}
                    // description="www.instagram.com" 
                    ></Meta>
                  </Card>
                </Link>
              </List.Item>
            )}
          >
          </List>
        </InfiniteScroll>
        </div>
        
      </div>
    )
  }
}

export default withRouter(ListCase);
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },{
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];