const BaseUrl = "http://localhost:3002";
const APIV1 = `${BaseUrl}`;
module.exports = {
    // APIV1:'/admin/api/v1',
    api: {
        baseUrl:"http://localhost:3002",
        imgUrl:"http://localhost:5000",
        case: {
            list: `${APIV1}/case/list`,
            detailById: `${APIV1}/case/detail`
        }
    }
}