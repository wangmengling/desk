import config from './config';
const BaseUrl = config.server.host + config.server.port;
const ApiUrl = config.server.apiHost + config.server.apiPort;
const APIV1 = `${ApiUrl}`;
module.exports = {
    // APIV1:'/admin/api/v1',
    api: {
        baseUrl:BaseUrl,
        imgUrl:"http://localhost:5000",
        case: {
            list: `${APIV1}/case/list`,
            detailById: `${APIV1}/case/detail`
        },
        color: {
            list: `${APIV1}/color/list`
        },
        style: {
            list: `${APIV1}/style/list`
        }
    }
}