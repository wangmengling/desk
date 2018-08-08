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
        this.loading = true;
        super.allList(API.api.color.list,function (data,err) {
            console.log(data)
            if (data.count) {
                this.colorList = data
            }
        })
    }

    @action styleFetchList() {
        super.allList(API.api.style.list,function (data,err) {
            console.log(data)
            if (data.count) {
                this.styleList = data
            }
        })
    }
}
export default  new FilterStore();