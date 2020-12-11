import React, { Component, Fragment } from 'react'
import { Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('文件仅支持 JPG/PNG 格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片文件大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
            isUpdate: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
    }
    handleCancel() {
        this.setState({
            previewVisible: false
        });
    }

    async handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange({ fileList }) {
        const imageUrlStr = fileList.map(item => {
            if (item.response && item.response.status == 'done') {
                return item.response.url
            }
        }).join(',')
        this.props.getImageUrlList(imageUrlStr)
        this.setState({
            fileList: fileList,
            isUpdate: true
        });
    }
    static getDerivedStateFromProps(props, state) {
        if (state.isUpdate) {
            //更新时不再将state用父组件的props.fileList进行更新，否则会置空state
            return null
        } else {
            //根据父组件的props.fileList更新state
            return {
                fileList: props.fileList
            }
        }

    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const { maxLength, action } = this.props;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Fragment>
                <Upload
                    name='file'
                    action={action}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= maxLength ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        )
    }
}

export default UploadImage