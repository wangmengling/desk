import React,{ Component } from "react";
import Button from "../../components/Button";
import PropTypes from 'prop-types'
import "./Category.css"

class Category extends Component {

    constructor(props) {
        super(props);
        this.selectAction = this.selectAction.bind(this);
        this.state = { 
            value:[] 
        };
    }

    componentWillMount() {
        // clearInterval(this.interval);
        this.setState({
            value:this.props.values
        });
        console.log(this.props.values);
    }


      
    
    
    selectAction(data) {
        
    }

    render() {
        return (
            <div className="CategoryList">
                {this.state.value.map((item,i) => (
                        <div key={i}>
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