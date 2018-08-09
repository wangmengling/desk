import BaseStore from "./BaseStore";
import Fetch from "../utils/Fetch";
import { message } from "antd";
import { observable, computed, action, autorun } from "mobx";
import API from "../../config/API.config";
class FilterStore  extends BaseStore{
    @observable colorList = [];
    @observable styleList = [];

    constructor() {
        super();
    }

    @action colorFetchList() {
        let that = this
        super.allList(API.api.color.list,function (data,err) {
            if (data.length > 0) {
                that.colorList = data
            }
        })
    }

    @action styleFetchList() {
        let that = this
        super.allList(API.api.style.list,function (data,err) {
            if (data.length > 0) {
                that.styleList = data
            }
        })
    }
}
export default  new FilterStore();