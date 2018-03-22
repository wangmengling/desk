import React,{ Component } from "react";
import Category from "./Category";

class Filter extends Component {
    render() {
        return (
            <div className="Filter">
                <div className="Category">
                    <Category values={["sd","asdfasdf","sdsd"]}/>
                </div>
            </div>
        )
    }
}

export default Filter;