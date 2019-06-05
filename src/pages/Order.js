import React from 'react'
import {
  Button,
  Table,
  Icon,
  Popconfirm,
  Modal,
  message,
  Collapse
} from 'antd'
import OrderForm from './OrderForm'
import $ from 'jquery'
//ajax的全局配置
$.ajaxSetup({
  error:function(error){
    message.error('服务器异常');
  }
})

class Order extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      list:[],
      ids:[],
      order:{}
    }
  }

  componentDidMount(){
     //加载菜品信息
    this.loadOrder();
  }
//加载菜品信息
  loadOrder = ()=>{
    $.get("http://127.0.0.1:8888/order/findAll",({status,message,data})=>{
      if(status === 200){
        this.setState({
          list:data
        })
      }
    })
  }

  saveFormRef = (form) => {
    console.log(form);
    this.setState({
      form
    })
  }

  // 显示模态框进行数据的添加
  toAdd = ()=>{
    this.setState({ 
      visible: true, 
      order:{status:"已接单"}
    });
  }

  toEdit(record){
    this.setState({
       visible: true, //  显示模态框
       order:record //  当前要修改的值
    });
  }

  batchDelete =()=>{
    Modal.confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:() => {
        console.log('OK');
        let url = "http://127.0.0.1:8888/order/batchDelete";
        $.ajax({
          url,
          method:'POST',
          data:JSON.stringify(this.state.ids),
          contentType:'application/json',
          success:(result)=>{
            message.success(result.message)
            this.loadOrder();
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
//点击删除
  delete(record){
    console.log(record);
    let url = "http://127.0.0.1:8888/order/deleteById?id="+record.id;
    $.get(url,(result)=>{
      if(result.status === 200){
        this.loadOrder();
        message.success(result.message);
      }else{
        message.error(result.message);
      }
    })
  }

  handleOk = e => {
    // 提交表单
    e.preventDefault();
    this.state.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let url = "http://127.0.0.1:8888/order/saveOrUpdate";
        $.post(url,values,(result)=>{
          //提示成功
          message.success(result.message);
          //关闭模态框
          this.setState({ visible: false, });
          //加载数据
          this.loadOrder();
        })
      }
    });
  };
  //点击取消
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  toDeails(record){
    this.props.history.push({
      pathname:'/orderDetails',
      payload:record
    });
  }

  render(){
    const columns = [
      {
        title: '订单时间',
        dataIndex: 'order_time',
        width:"200px"
      },
     
      {
        title: '状态',
        dataIndex: 'status',
        width:"200px"
      },
      {
        title: '下单用户',
        dataIndex: 'user_id',
        width:"150px"
      },
      {
        title: '操作',
        dataIndex: '',
        render: (text,record) => {
          return (
            <div>
              <Popconfirm title="Are you sure？" onConfirm={this.delete.bind(this,record)} okText="Yes" cancelText="No">
                <Button type="link" >
                    <Icon type="delete" /></Button>
              </Popconfirm>
              <Button type="link" onClick={this.toEdit.bind(this,record)}>
                    <Icon type="edit" /></Button>
              <Icon type='eye' onClick={this.toDeails.bind(this,record)}/>
            </div>
          )
        }
        
        
      },
    ];
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          ids:selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div className="order">
        <h2>订单管理</h2>
        <div className="btns">
          <Button onClick={this.toAdd}>添加</Button> &nbsp;
          <Button type="danger" onClick={this.batchDelete}>批量删除</Button>
        </div>
        {/* 表格 */}
        <Table 
          size="small"
          rowKey="id" 
          rowSelection={rowSelection} 
          columns={columns} 
          bordered={Collapse}
          dataSource={this.state.list} />
        {/* 模态框 */}
        <Modal
          title="添加订单信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <OrderForm ref={this.saveFormRef} order={this.state.order} />
        </Modal>
      </div>

    )
  }
}

export default Order;