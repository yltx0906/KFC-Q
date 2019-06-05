import React from 'react'
import { Button } from 'antd';

class UserDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user:null
    }
  }

  componentWillMount(){
    this.setState({
      user:this.props.location.payload
    })
  }

  render(){
    let {user} = this.state;
    return (
      <div className="userDetails">
        <h2>{user.name}用户详情</h2>
        <Button type="link" onClick={()=>{
          this.props.history.goBack()
        }}>返回</Button>
        <div><img src={user.photo} alt=""/></div>
      </div>
    )
  }
}

export default UserDetails;