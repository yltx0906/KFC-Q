import React from 'react'
import {connect} from 'react-redux'
//import { Button } from 'antd';

class Memo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form:{
                content:[]http://localhost:3000/
            }
        }
    }

    addHandler(event){
        //1.阻止表单默认提交
        event.preventDefault();
        //2.接收参数
        let payload = {
            content:this.state.form.content,
            time:"2019-5-27 19:00",
            status:"未完成"
        }
        //3.要改变redux store中的state
        //store.dispatch({type:"ADD_MEMO",payload})
        this.props.addMemo(payload)
    }

    changeHandler(event){
        let val = event.target.value;
        this.setState({
            form:{
                content:val
            }
        })
    }

    render(){
        let {form} = this.state;
        return(
            <div className='memo'>
                <h2>备忘录管理(无ajax)</h2>
                {JSON.stringify(this.state)}
                <div className="btns">
                    <form onSubmit={this.addHandler.bind(this)}>
                        <input type="text" value={form.content} onChange={this.changeHandler.bind(this)}/>
                        <input type="submit" value="保存"/>
                    </form>
                </div>
                <ul>
                    {
                        this.props.memoState.list.map((item,index)=>
                        {
                            return <li key={index}>{item.content},{item.time}</li>;
                        })
                    }
                </ul>
            </div>
        )
    }

}

//将redux store状态 => 映射到props
let mapStateToProps = (state)=>{
    return state;
}
let mapDispatchToProps = (dispatch)=>{
    return {
        //分发action(分发之后对应的type就会执行)
        addMemo:function(payload){
            dispatch({
                type:'ADD_MEMO',
                payload
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Memo);