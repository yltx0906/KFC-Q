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
import ProductForm from './ProductForm'
import $ from 'jquery'
//ajax的全局配置
$.ajaxSetup({
  error:function(error){
    message.error('服务器异常');
  }
})

class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      list:[],
      ids:[],
      product:{}
    }
  }

  componentDidMount(){
     //加载菜品信息
    this.loadProduct();
  }
//加载菜品信息
  loadProduct = ()=>{
    $.get("http://127.0.0.1:8888/product/findAll",({status,message,data})=>{
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
      product:{status:"正在销售"}
    });
  }

  toEdit(record){
    this.setState({
       visible: true, //  显示模态框
       product:record //  当前要修改的值
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
        let url = "http://127.0.0.1:8888/product/batchDelete";
        $.ajax({
          url,
          method:'POST',
          data:JSON.stringify(this.state.ids),
          contentType:'application/json',
          success:(result)=>{
            message.success(result.message)
            this.loadProduct();
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
    let url = "http://127.0.0.1:8888/product/deleteById?id="+record.id;
    $.get(url,(result)=>{
      if(result.status === 200){
        this.loadProduct();
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
        let url = "http://127.0.0.1:8888/product/saveOrUpdate";
        $.post(url,values,(result)=>{
          //提示成功
          message.success(result.message);
          //关闭模态框
          this.setState({ visible: false, });
          //加载数据
          this.loadProduct();
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
      pathname:'/productDetails',
      payload:record
    });
  }

  render(){
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        width:"200px"
      },
      {
        title: '描述',
        dataIndex: 'description',
        width:"400px"
      },
      {
        title: '价格',
        dataIndex: 'price',
        width:"200px"
      },
      {
        title: '状态',
        dataIndex: 'status',
        width:"200px"
      },
      {
        title: '销量',
        dataIndex: 'xiaoliang',
        width:"150px"
      },
      {
        title: '种类',
        dataIndex: 'category_id',
        width:"150px"
      },
      {
        title: '缩略图',
        render:(text,record)=>{
          return (
            <img style={{width:"40px",height:"40px",borderRadius:"50%"}} src={record.photo} alt=""></img>
          )
        },
        width:"200px"
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
      <div className="product">
        <h2>菜单管理</h2>
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
          title="添加菜品信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ProductForm ref={this.saveFormRef} product={this.state.product} />
        </Modal>
      </div>

    )
  }
}

export default Product;