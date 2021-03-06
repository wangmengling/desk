import React, { Component } from "react";
import Filter from "./Filter";
import { withRouter, Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import "./ListCase.less";
import {  List, Card, Spin, message } from 'antd';
import { Meta } from "antd/lib/list/Item";
import CaseBlock from "./CaseBlock";
import { observer } from "mobx-react";
import API from "../../../config/API.config";
const {ipcRenderer}  = window.require("electron")

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
    this.filterAction = this.filterAction.bind(this);
  }

  componentWillMount() {
    this.props.store.pageIsMoreData = true;
    this.props.store.list();
    ipcRenderer.on('ping', () => {
      ipcRenderer.sendToHost('pong')
    })
  }

  handleInfiniteOnLoad = () => {
    let data = this.props.store.dataList;
    // this.props.store.loading = true;
    console.log("111111111111")
    console.log(data.length)
    console.log(this.props.store.count)
    console.log("111111111111")
    if (data.length >= this.props.store.count) {
      message.warning('Infinite List loaded all');
      this.props.store.hasMore = false;
      this.props.store.loading = false;
      return;
    }
    this.props.store.pageIndex += 1;
    this.props.store.list();
  }

  toDetailAction(item){
    ipcRenderer.sendToHost(item)
    // ipcRenderer.sendToHost('detailData', item.Id)
  }

  filterAction(isSelect,selectIndex,value,type) {
    console.log(selectIndex,value,type)
    if (isSelect == true) {
      this.props.store.searchParams[type] = value
    }else {
      this.props.store.searchParams[type] = ""
    }
    this.props.store.pageIndex = 0
    this.props.store.list()
  }

  render() {
    var loadView = "";
      if (this.props.store.loading == true && this.props.store.hasMore == true) {
        loadView =<Spin className="demo-loading" />;
      }else {
        loadView = "";
      }
    return (
      <div className="CaseList" >
        <InfiniteScroll
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.props.store.loading && this.props.store.hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
        >
        <div className="CaseFilter">
          <Filter onClick={this.filterAction}/>
        </div>
        <div className="CaseContent">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={this.props.store.dataList}
            renderItem={item => (
              <List.Item>
                  <Card
                    hoverable
                    cover={<img src={API.api.imgUrl+item.ThumbUrl} />}
                    onClick={this.toDetailAction.bind(this,item)}
                  >
                    <Meta
                      title={item.Title}
                    ></Meta>
                  </Card>
              </List.Item>
            )}
          >
          </List>
          </div>
        {loadView}
        </InfiniteScroll>
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