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
        });
    }
    
    selectAction(isSelect,selectIndex) {
        this.setState({
            isSelect:isSelect,
            selectIndex:selectIndex
        })
    }

    render() {
        return (
            <div className="CategoryList">
                {this.state.value.map((item,i) => (
                        <div key={i} className="category">
                            <Button isSelect={true} onClick={this.selectAction} value={item}/>
                        </div>
                    ))
                }
            </div>
        )
    }
}

Category.PropTypes = {
    values: PropTypes.array
}

export default Category;