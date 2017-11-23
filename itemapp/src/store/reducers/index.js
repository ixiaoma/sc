import cartReducer from './cart'
const reducer = (state={classData:[],brandData:[],productData:[],filterData:[]},action)=>{
    switch(action.type){
        case "classify":
        var newState = JSON.parse(JSON.stringify(state))
        newState.classData = action.payload.classData
        return newState
        case "brands":
        var newState = JSON.parse(JSON.stringify(state))
        newState.brandData = action.payload.brandData
        return newState
        case "addProduct":
        var newState = JSON.parse(JSON.stringify(state))
        if(action.payload.more){
            newState.productData = newState.productData.concat(newState.productData)
        }else{
            newState.productData = action.payload.productData
        }
        return newState
        // case "FilterList":
        // var newState = JSON.parse(JSON.stringify(state))
        // newState.filterData = action.payload.filterData
        // return newState
        default:
        return state
    }
}
export {cartReducer,reducer}
