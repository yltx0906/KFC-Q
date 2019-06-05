import React from 'react'
import { Button } from 'antd';

class CategoryDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      category:null
    }
  }

  componentWillMount(){
    this.setState({
      category:this.props.location.payload
    })
  }

  render(){
    let {category} = this.state;
    return (
      <div className="categoryDetails">
        <h2>{category.name}分类详情</h2>
        <Button type="link" onClick={()=>{
          this.props.history.goBack()
        }}>返回</Button>
        <div><img src={category.photo} alt=""/></div>
      </div>
    )
  }
}

export default CategoryDetails;