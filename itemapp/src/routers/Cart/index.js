import React,{Component} from 'react'
import {Header,Content} from '../../component/public'
import {Link} from 'react-router'
import fetchJsonp from 'fetch-jsonp'
import {connect} from 'react-redux'
import './cart.css'
import CartData from './cart'
import {CartListDataActionCreator} from "../../actions/cart"
class Cart extends Component{
    render(){
        const {cartData,dispatch} = this.props
        let all_price = 0
        let checkedCommonTotalCount = 0
        cartData.isContainSOP=true
        cartData.cartItems&&cartData.cartItems.forEach(element => {
            if(element.isChecked){
                all_price += element.quantity*element.historyPrice
                checkedCommonTotalCount += element.quantity
            }else{
                cartData.isContainSOP=false
            }
        });
        return <div id="cart-page">
        <Header backBtn={true} tit="购物袋" rightBtn={<Link to="/cart">编辑</Link>}/>
        <Content>
            <CartData/>
        </Content>
        <div className="cart_footer">
                <div className="sum_num"><div className={cartData.isContainSOP ? "payselectDIV selected" : "payselectDIV"} onClick={()=>dispatch({type:"CART_SELECT_ALL"})}></div>全选
                    合计:￥{all_price}(不含税金)
                </div>
                <Link to="/order" className="total_btn">去结算({checkedCommonTotalCount})</Link>
            </div>
        </div>
    }
    componentDidMount(){
        this.props.dispatch(CartListDataActionCreator())
    }
}
  function mapStateToProps(state){
      return {
          cartData : state.cartReducer.cartData
      }
  }
export default connect(mapStateToProps)(Cart)