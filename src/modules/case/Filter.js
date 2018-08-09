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
    }

    componentWillMount() {
        filterStore.colorFetchList()
        filterStore.styleFetchList()
    }

    render() {
        let colorList = []
        let styleList = []
        let colorCategory
        let styleCategory
        filterStore.colorList.forEach((element,index,array) => {      
            colorList.push(element.Name)
            if (index == array.length - 1) {
                colorCategory = <Category onClick={this.props.onClick} values={colorList} type="color"/>
            }
        })

        filterStore.styleList.forEach((element,index,array) => {
            styleList.push(element.Name)
            if (index == array.length - 1) {
                styleCategory = <Category onClick={this.props.onClick} values={styleList} type="style"/>
            }
        })
        
        return (
            <div className="Filter">
                <div className="FilterCategory">
                    <div className="FilterCategoryTitle">婚礼风格:</div> 
                    <div> 
                        {styleCategory}
                    </div>
                </div>
                <div className="FilterCategory">
                    <div className="FilterCategoryTitle">婚礼色系:</div> <div> 
                        {colorCategory}
                    </div>
                </div>
            </div>
        )
    }
}

Filter.PropTypes = {
    onClick:PropTypes.func
}

export default Filter;