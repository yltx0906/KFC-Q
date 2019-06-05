import React from 'react'
import { Button } from 'antd';

class ProductDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      product:null
    }
  }

  componentWillMount(){
    this.setState({
      product:this.props.location.payload
    })
  }

  render(){
    let {product} = this.state;
    return (
      <div className="productDetails">
        <h2>{product.name}菜品详情</h2>
        <Button type="link" onClick={()=>{
          this.props.history.goBack()
        }}>返回</Button>
        <div><img src={product.photo} alt=""/></div>
      </div>
    )
  }
}

export default ProductDetails;