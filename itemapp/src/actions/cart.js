import fetchJsonp from 'fetch-jsonp'
import {Toast} from 'antd-mobile'
function CartListDataActionCreator(){
    return actionCreator("CART_LIST_DATA",async ()=>{
        const res = await fetchJsonp("http://m.secoo.com/getAjaxData.action?urlfilter=cart/cart.jsp?v=1.0&client=iphone&method=secoo.cart.get&cartType=0&aid=5&vo.upkey=2332e099ab2a484ab608c7e5c7659681|249950742671|ea29d34b05c04f3cbd63020bc978e9a1|2A7834A271ED286D077DD47DD18A649D&vo.productInfo=[]&openCloud=1&_="+new Date().getTime())
        const data = await res.json()
        console.log(data)
        return  {cartData:data.rp_result.cart}
    })
}
function CartChangeNumActionCreator({index,p_id,num}){
    return actionCreator("CART_CHANGE_NUM",async ()=>{
        const res = await fetchJsonp("http://m.secoo.com/getAjaxData.action?urlfilter=cart/cart.jsp?v=1.0&client=iphone&method=secoo.cart.updatequantity&cartType=0&aid=5&vo.upkey=2332e099ab2a484ab608c7e5c7659681|249950742671|ea29d34b05c04f3cbd63020bc978e9a1|2A7834A271ED286D077DD47DD18A649D&vo.productInfo=[]&vo.itemKey="+p_id+"&vo.quantity="+num+"&openCloud=1&_="+new Date().getTime)
        const data = await res.json()
        return  {num,index}
    })
}
function CartSelectedActionCreator({index,p_id,stateCode,p_num}){
    return actionCreator("CART_SELECT_ROW",async ()=>{
        var newStateCode
        if(stateCode){
            newStateCode = 0
        }else{
            newStateCode = 1
        }
        const res = await fetchJsonp("http://m.secoo.com/getAjaxData.action?urlfilter=cart/cart.jsp?v=1.0&client=iphone&method=secoo.cart.chose&cartType=0&aid=5&vo.upkey=2332e099ab2a484ab608c7e5c7659681|249950742671|ea29d34b05c04f3cbd63020bc978e9a1|2A7834A271ED286D077DD47DD18A649D&vo.productInfo=[]&vo.choseProductInfo=[{%22productId%22:"+p_id+",%22quantity%22:"+p_num+",%22type%22:0,%22areaType%22:0,%22isChecked%22:"+stateCode+"}]&isChecked="+newStateCode+"&openCloud=1&_="+new Date().getTime)
        const data = await res.json()
        return  {index}
    })
}
function CartDeleteActionCreator({itemKey,delIndex}){
    return actionCreator("CART_DELETE_ITEM",async ()=>{
        const res = await fetchJsonp("http://m.secoo.com/getAjaxData.action?urlfilter=cart/cart.jsp?v=1.0&client=iphone&method=secoo.cart.delete&cartType=0&aid=5&vo.upkey=2332e099ab2a484ab608c7e5c7659681|249950742671|ea29d34b05c04f3cbd63020bc978e9a1|2A7834A271ED286D077DD47DD18A649D&vo.productInfo=[]&vo.itemKey="+itemKey+"&openCloud=1&_="+new Date().getTime())
        const data = await res.json()
        Toast.info("删除成功",1)
        return {delIndex}
    })
}
  function actionCreator(type,callback){
    return{
        type,payload:callback()
    }
  }

  export {CartListDataActionCreator,CartChangeNumActionCreator,CartSelectedActionCreator,CartDeleteActionCreator}