import React from 'react'
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  message,
  Radio
} from 'antd'

class CategoryForm extends React.Component {
  goback = ()=>{
    this.props.history.goBack();
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const props = {
      name: 'file',
      action: 'http://134.175.154.93:8099/manager/file/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange:(info)=> {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          let resp = info.file.response.data;
          console.log(resp);
          let id = "http://134.175.154.93:8888/"+resp.groupname+"/"+resp.id;
          //将id设置到表单
          this.props.form.setFieldsValue({
            photo:id
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    getFieldDecorator('id')
    getFieldDecorator('photo')
    getFieldDecorator('name')
    
    return (
      <div className="categoryForm">
      <Form {...formItemLayout} className="login-form">
        <Form.Item  label="种类名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input placeholder="请输入种类名" />,
          )}
        </Form.Item>
       
        <Form.Item label="图片上传">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </Form.Item>
      </Form>
      </div>
    )
  }
}

const mapPropsToFields = (props) =>{
  let obj = {};
  for(let key in props.category){
    obj[key] = Form.createFormField({
      value: props.category[key]
    })
  }
  return obj;
}
export default Form.create({
  mapPropsToFields
})(CategoryForm);