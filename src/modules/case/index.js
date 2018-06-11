import React,{ Component } from "react";
import ListCase from "./ListCase";
import CaseStore from "../../store/CaseStore";
import CaseDetail from "./CaseDetail";

var listCase = () => (
    <ListCase store={CaseStore} />
  )
export{
    listCase,
    CaseDetail
}