import React,{ Component } from "react";
import PropTypes from 'prop-types'
import  "./index.css";
class Button extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { 
            isSelect: false 
        };
    }

    onClick() {
        this.setState({
            isSelect: !this.state.isSelect 
        }, () => {
            if (this.props.onClick) {
                this.props.onClick(this.state.isSelect,this.props.number);
            }
        });
    }
    render() {
        let sonnetButton = "sonnetButton";
        let sonnetButtonText = "sonnetButtonText";
        if (this.state.isSelect) {
            sonnetButton = "sonnetButtonSelect"
            sonnetButtonText = "sonnetButtonTextSelect"
        }else {
            sonnetButton = "sonnetButton"
            sonnetButtonText = "sonnetButtonText"
        }
        let { value } = this.props;
        return (
            <div className={sonnetButton} onClick={this.onClick}>
                <font className={sonnetButtonText}>{value}</font>
            </div>
        )
    }
}

Button.propTypes = {
    isSelect: PropTypes.bool,
    value:PropTypes.string,
    onClick:PropTypes.func,
    number:PropTypes.number
}

export default Button;