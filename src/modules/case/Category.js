import React,{ Component } from "react";
import Button from "../../components/Button";
import PropTypes from 'prop-types'
import "./Category.css"

class Category extends Component {

    constructor(props) {
        super(props);
        this.selectAction = this.selectAction.bind(this);
        this.state = { 
            value:[],
            selectIndex:0,
            isSelect:false
        };
    }

    componentWillMount() {
        this.setState({
            value:this.props.values
        },()=>{
            
        });
    }
    
    selectAction(isSelect,selectIndex,value) {
        this.setState({
            selectIndex:selectIndex,
            isSelect:isSelect,
        },()=>{
            this.props.onClick(isSelect,selectIndex,value,this.props.type)
        })
    }

    render() {
        let isSelect = this.state.isSelect;
        return (
            <div className="CategoryList">
               {this.state.value.map((item,i) => (
                        (isSelect && i == this.state.selectIndex) ? (
                            <div key={i} className="category">
                                <Button isSelect={true} onClick={this.selectAction} value={item}  number={i}/>
                            </div>
                        ) : (
                            <div key={i} className="category">
                            <span></span>
                                <Button  isSelect={false} onClick={this.selectAction} value={item}  number={i}/>
                            </div>
                        )
                    ))
                }
            </div>
        )
    }
}

Category.PropTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    onClick: PropTypes.func
}

export default Category;