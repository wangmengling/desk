import React,{ Component } from "react";
import PropTypes from 'prop-types'
import  "./CaseBlock.less";
class CaseBlock extends Component {
    render() {
        let props = this.props
        console.log(props.width)
        return (
            <div className="CaseBlock" style={{width:props.width * 1,height:props.width * 0.6}}>
                <div className="CBCover">
                    <img src="https://iq.dxlfile.com/hotel/original/2017-04/20170425155021891.jpg-w530h400" />
                </div>
                <div className="CBTitle">
                    <font>幸福公社</font>
                </div>
            </div>
        )
    }
}
CaseBlock.PropTypes = {
    width:PropTypes.number
}
export default CaseBlock;