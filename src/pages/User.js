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
import UserForm from './UserForm'
import $ from 'jquery'
//ajax的全局配置
$.ajaxSetup({
  error:function(error){
    message.error('服务器异常');
  }
})
class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      list:[],
      ids:[],
      user:{}
    }
  }
  componentDidMount(){
    //加载分类信息
    this.loadUser();
  }
  loadUser = ()=>{
    $.get("http://127.0.0.1:8888/user/findAll",({status,message,data})=>{
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
      user:{}
    });
  }
  toEdit(record){
    this.setState({
       visible: true, //  显示模态框
       user:record //  当前要修改的值
    });
  }
  //点击删除
  delete(record){
    console.log(record);
    let url = "http://127.0.0.1:8888/user/deleteById?id="+record.id;
    $.get(url,(result)=>{
      if(result.status === 200){
        this.loadUser();
        message.success(result.message);
      }else{
        message.error(result.message);
      }
    })
  }
  //批量删除
  batchDelete =()=>{
    Modal.confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:() => {
        console.log('OK');
        let url = "http://127.0.0.1:8888/user/batchDelete";
        $.ajax({
          url,
          method:'POST',
          data:JSON.stringify(this.state.ids),
          contentType:'application/json',
          success:(result)=>{
            message.success(result.message)
            this.loadUser();
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //点击OK
  handleOk = e => {
    // 提交表单
    e.preventDefault();
    this.state.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let url = "http://127.0.0.1:8888/user/saveOrUpdate";
        $.post(url,values,(result)=>{
          //提示成功
          message.success(result.message);
          //关闭模态框
          this.setState({ visible: false, });
          //加载数据
          this.loadUser();
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
  //显示详细信息
  toDeails(record){
    this.props.history.push({
      pathname:'/userDetails',
      payload:record
    });
  }

  render(){
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width:"200px"
      },
     
      {
        title: '电话',
        dataIndex: 'telephone',
        width:"200px"
      },
      {
        title: '密码',
        dataIndex: 'password',
        width:"200px"
      },
      {
        title: '图片',
        render:(text,record)=>{
          return (
            <img style={{width:"40px",height:"40px",borderRadius:"50%"}} src={record.photo} alt=""></img>
          )
        },
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
      <div className="user">
        <h2>用户管理</h2>
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
          title="添加分类信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UserForm ref={this.saveFormRef} user={this.state.user} />
        </Modal>
      </div>

    )
  }
}

export default User;