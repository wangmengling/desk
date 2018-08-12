import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Card, Tag, List, Button } from 'antd';
import CaseStore from "../../store/CaseStore";
import "./CaseDetail.less";
// import VideoPlayer from '../../components/MediaPlayer/VideoPlayer'
import API from "../../../config/API.config";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
const {ipcRenderer}  = window.require("electron")
import Gallery from 'react-photo-gallery';
import ReactPlayer from 'react-player'

const images = [
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
    'http://img.blog.csdn.net/20171219205022816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc29uZzI3OTgxMTc5OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast',
];
const customStyles = {
    // content : {
        backgroundColor            : '#fff'
    // }
  };
@observer
class CaseDetail extends Component {
    constructor(props, context) {
        super(props, context);
        // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        console.log("dddddddddddd")
        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }
    componentWillMount() {
        // this.props.store.detail();
        // console.log(this.props.location.state)
        ipcRenderer.on('detailData', (event,message) => {
            // ipcRenderer.sendToHost('pong')
            // var { caseId } = this.props.location.state;
            
            CaseStore.detailById(API.api.case.detailById, message);
        })
        console.log(this.props)
        
        
    }

    openLightbox(event, obj) {
        // this.setState({
        //   currentImage: obj.index,
        //   lightboxIsOpen: true,
        // });
        this.setState({ isOpen: true,photoIndex:obj.index })
      }
    
    render() {
        var detailData = CaseStore.detailData;
        let time = "";
        if (detailData.CreateTime) {
            time = (new Date(parseInt(detailData.CreateTime))).toLocaleString();
        }
        const { photoIndex, isOpen } = this.state;
        let imageArray = []
        // console.log(detailData.ImageUrl)
        if (detailData.ImageUrl != null) {
            detailData.ImageUrl.forEach(element => {
                // console.log(element)
                console.log(element[0]["src"])
                let image = {
                    src:API.api.imgUrl +  element[0]["src"],
                    height:element[0]["width"],
                    width:element[0]["height"]
                }
                imageArray.push(image)
            });
        }
        
        return (
            <div className="CaseDetail">
                {/* <Card className="CaseDetailCardImage" bordered={false} style={{ width: '100%' }}>
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={imageArray}
                        renderItem={(item,index )=> (
                            <List.Item>
                                <Card
                                    hoverable
                                    bodyStyle={{ padding: '0px' }}
                                cover={<img src={API.api.imgUrl + item[0]["src"]} />}
                                onClick={() => this.setState({ isOpen: true,photoIndex:index })}
                                >
                                </Card>
                            </List.Item>
                        )}
                    />
                </Card> */}
                <div className="detailTop">
                    <div className="detailTitle">
                        {detailData.Title}
                    </div>
                    <div className="detailTimeAndAddress">
                        <div className="detailTime">
                            婚礼日期：{time}
                        </div>
                        <div className="detailAddress">
                            婚礼地点：{detailData.Address}
                        </div>
                    </div>
                    <div className="detailDescription">
                        {detailData.Description}
                    </div>
                </div>
                <div className="detailVideo">
                    <ReactPlayer url={API.api.imgUrl + detailData.VideoUrl} playing />,
                </div>
                <div className="detialGallery">
                    <Gallery 
                    onClick={this.openLightbox}
                    photos={imageArray} 
                    columns={4} 
                    />
                    {isOpen && (
                        <Lightbox
                            mainSrc={API.api.imgUrl + detailData.ImageUrl[photoIndex][0]["src"]}
                            nextSrc={API.api.imgUrl + detailData.ImageUrl[(photoIndex + 1) % detailData.ImageUrl.length][0]["src"]}
                            prevSrc={API.api.imgUrl + detailData.ImageUrl[(photoIndex + detailData.ImageUrl.length - 1) % detailData.ImageUrl.length][0]["src"]}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + detailData.ImageUrl.length - 1) % detailData.ImageUrl.length,
                                })
                            }
                            imageStyle={customStyles}
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % detailData.ImageUrl.length,
                                })
                            }
                        />
                    )}
                </div>
                
            </div> 
        )
    }
}
const photos = [
    { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
    { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
  ];

export default withRouter(CaseDetail);