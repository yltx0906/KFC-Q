//定义初始化状态
let initState = {
    loading:false,
    visible:false,
    list:[{
        content:"今晚面试",
        time:"2019-5-27 19:00",
        status:"未完成"
    }]
}

//定义reducer
function memoReducer(state = initState,action){
    switch(action.type){
        case "BEGIN_LODAING":
            return {
                ...state,
                loading:true
            }
        case "END_LOADING":
            return {
                ...state,
                loading:false
            }
        case "ADD_MEMO":
            return {
                ...state,
                list:[...state.list,action.payload]
            }
        default:
            return state;
    }
}

export default memoReducer;