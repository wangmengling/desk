import React,{ Component } from "react";
import Filter from "./Filter";
import InfiniteScroll from 'react-infinite-scroller';
import  "./List.less";
import CaseBlock from "./CaseBlock";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bordered: true,
          pagination: true,
          size: 'default',
          rowSelection: {},
          scroll: undefined,
        }
        // this.props.store.pageSize = 10;
        // this.props.store.pageIndex = 0;
      }

      handleInfiniteOnLoad = () => {
        // let data = this.props.store.dataList;
        // // this.props.store.loading = true;
        // if (data.length >= this.props.store.count) {
        //   message.warning('Infinite List loaded all');
        //   this.props.store.hasMore = false;
        //   this.props.store.loading = false;
        //   return;
        // }
        // this.props.store.pageIndex += 1;
        // this.props.store.list();
      }
    render() {
        return (
            <div className="CaseList">
                <div className="CaseFilter">
                    <Filter />
                    {/* 大发送到发 */}
                </div>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    // hasMore={!this.props.store.loading && this.props.store.hasMore}
                    useWindow={false}
                    className="CaseContent"
                >
                    <CaseBlock />
                </InfiniteScroll>
            </div>
        )
    }
}

export default List;