import React,{ Component } from "react";
import Filter from "./Filter";
import  "./List.css";

class List extends Component {
    state = {

    }
    render() {
        return (
            <div className="CaseList">
                <div className="CaseFilter">
                    <Filter />
                    {/* 大发送到发 */}
                </div>
            </div>
        )
    }
}

export default List;