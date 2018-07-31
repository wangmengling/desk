const BaseUrl = "http://localhost:4008";
const ApiUrl = "http://localhost:3002";
const APIV1 = `${ApiUrl}`;
module.exports = {
    // APIV1:'/admin/api/v1',
    api: {
        baseUrl:BaseUrl,
        imgUrl:"http://localhost:5000",
        case: {
            list: `${APIV1}/case/list`,
            detailById: `${APIV1}/case/detail`
        }
    }
}