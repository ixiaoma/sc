const cartReducer = (state={cartData:{}},action)=>{
    switch(action.type){
        case "CART_LIST_DATA":
        var newState = JSON.parse(JSON.stringify(state))
        newState.cartData = action.payload.cartData
        return newState
        //单选
        case "CART_SELECT_ROW":
        var newState = JSON.parse(JSON.stringify(state))
        var {index} = action.payload
        newState.cartData.cartItems[index].isChecked = !newState.cartData.cartItems[index].isChecked
        newState.cartData.isContainSOP = true
        newState.cartData.cartItems.forEach(ele=>{
            if(!ele.isChecked){
                newState.cartData.isContainSOP = false
            }
        });
        return newState
        //全选
        case "CART_SELECT_ALL":
        var newState = JSON.parse(JSON.stringify(state))
        newState.cartData.isContainSOP = !newState.cartData.isContainSOP
        newState.cartData.cartItems.forEach(element => {
            element.isChecked = newState.cartData.isContainSOP
        });
        return newState
        //改变数量
        case "CART_CHANGE_NUM":
        var newState =JSON.parse(JSON.stringify(state))
        const {index,p_id,num} = action.payload
        newState.cartData.cartItems[index].quantity = num
        return newState
        //删除
        case "CART_DELETE_ITEM":
        var newState = JSON.parse(JSON.stringify(state))
        const {delIndex} = action.payload
        newState.cartData.cartItems.splice(delIndex,1)
        return newState
        
        default:
        return state
    }
}
export default cartReducer