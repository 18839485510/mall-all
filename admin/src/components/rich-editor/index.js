import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'

import './index.less'
class RichEditor extends Component {
    render() {
        const { data, uploadUrl, getData } = this.props
        return (
            <div>
                <CKEditor
                    editor={ClassicEditor}
                    data={data}
                    config={{
                        language: 'zh-cn',
                        ckfinder: {
                            uploadUrl: uploadUrl
                        }
                    }}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        getData(data);
                    }}
                    onBlur={(event, editor) => {

                        //console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        //console.log('Focus.', editor);
                    }}
                />
            </div>
        )
    }
}
export default RichEditor