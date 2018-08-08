import React,{ Component } from "react";
import Category from "./Category";
import  "./Filter.less";
import PropTypes from "prop-types";
import filterStore from "../../store/FilterStore";
import { observer } from "../../../node_modules/mobx-react";
@observer
class Filter extends Component {
    constructor(props) {
        super(props)
        filterStore.colorFetchList()
        filterStore.styleFetchList()
    }
    render() {
        return (
            <div className="Filter">
                <div className="FilterCategory">
                    <div className="FilterCategoryTitle">婚礼风格:</div> 
                    <div> 
                        <Category values={["中式婚礼","欧式婚礼","北京","北京","北京","北京","北京"]}/>
                    </div>
                </div>
                <div className="FilterCategory">
                    <div className="FilterCategoryTitle">婚礼风格:</div> <div> <Category values={["中式婚礼","欧式婚礼","北京"]}/></div>
                </div>
            </div>
        )
    }
}

Filter.PropTypes = {
    onClick:PropTypes.func
}

export default Filter;