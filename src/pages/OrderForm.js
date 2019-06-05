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

class OrderForm extends React.Component {
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
    
    getFieldDecorator('id')
    getFieldDecorator('order_time')
    getFieldDecorator('status')
    getFieldDecorator('user_id')
    return (
      <div className="orderForm">
      <Form {...formItemLayout} className="login-form">
        <Form.Item  label="订单时间">
          {getFieldDecorator('order_time', {
            rules: [{ required: true, message: '请输入订单时间!' }],
          })(
            <Input placeholder="请输入订单时间" />,
          )}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator('status', {
            rules: [{ required: true, message: 'Please input your Status!' }],
          })(
            <Radio.Group name="radiogroup" defaultValue={"已接单"}>
              <Radio value={"已接单"}>已接单</Radio>
              <Radio value={"已完成"}>已完成</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
      </Form>
      </div>
    )
  }
}

const mapPropsToFields = (props) =>{
  let obj = {};
  for(let key in props.order){
    obj[key] = Form.createFormField({
      value: props.order[key]
    })
  }
  return obj;
}
export default Form.create({
  mapPropsToFields
})(OrderForm);