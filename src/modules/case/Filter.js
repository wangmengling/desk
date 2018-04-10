import React,{ Component } from "react";
import Category from "./Category";
import  "./Filter.less";

class Filter extends Component {
    render() {
        return (
            <div className="Filter">
                <div className="FilterCategory">
                    <div className="FilterCategoryTitle">婚礼风格:</div> <div> <Category values={["中式婚礼","欧式婚礼","北京","北京","北京","北京","北京"]}/></div>
                </div>
                <div className="FilterCategory">
                    <div className="FilterCategoryTitle">婚礼风格:</div> <div> <Category values={["中式婚礼","欧式婚礼","北京"]}/></div>
                </div>
            </div>
        )
    }
}

export default Filter;