import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Stepper,SwipeAction,Modal} from 'antd-mobile'
import fetchJsonp from 'fetch-jsonp'
import './cart.css'
import {CartListDataActionCreator,CartChangeNumActionCreator,CartSelectedActionCreator,CartDeleteActionCreator} from '../../actions/cart'
class CartData extends Component{
    render(){
        const {cartData,dispatch} = this.props
        let all_price = 0
        cartData.cartItems&&cartData.cartItems.forEach(element => {
            if(element.isChecked){
                all_price += element.quantity*element.nowPrice
            }
        });
       return <div className="cartCon">
            {cartData.cartItems && cartData.cartItems.map((ele,index)=>{
                 return <SwipeAction
                 key={index}
                 style={{ backgroundColor: 'gray' }}
                 autoClose
                 right={[
                   {
                     text: 'Cancel',
                     style: { backgroundColor: '#ddd', color: 'white' },
                   },
                   {
                     text: 'Delete',
                     onPress: () => this.deleteItem({delIndex:index,itemKey:ele.itemKey}),
                     style: { backgroundColor: '#F4333C', color: 'white' },
                   },
                 ]}
               >
                 <dl className="cart_list" >
                 <dt><div className={ele.isChecked ? "payselectDIV selected" :"payselectDIV"} onClick={()=>this.changeRow({index,p_id:ele.productId,stateCode:ele.isChecked,p_num:ele.quantity})}></div><Link  to={"/detail/"+ele.productId}><img src={"http://pic.secoo.com/product/120/120/"+ele.image} className="shopCar_pic" width="68" height="68"/></Link></dt>
                 <dd className="cart_msg">
                 <div className=" secoo_t">
                     <p className="sca_title"><Link  to={"/detail/"+ele.itemKey}>{ele.name}</Link></p>
                     <Stepper style={{ width: '30%', minWidth: '100px' }}
                                showNumber
                                min={1}
                                max={ele.inventory}
                                defaultValue={ele.quantity}
                                onChange={(num)=>this.changeNum({index,p_id:ele.itemKey,num})}
                              />
                     <div className="choose_style"><p>{ele.color &&<span>颜色:{ele.color}</span>} {ele.size ? <span>尺码:{ele.size}</span> : ""}</p></div>
                 </div>
                  <div className="secoo_pri">¥<em>{ele.quantity*ele.nowPrice}</em> </div>
                 </dd>
             </dl>
             </SwipeAction> 
            })}
            <div className="package cart_list">
            <dt><div className="payselectDIV selected"></div></dt><dd><p>精美礼品包装</p></dd></div>
            <div className="sum_btm">
            <p className="sum_price"><span>商品金额:</span><p>￥<span>{all_price}</span></p></p>
            <p className="baoxian">
                <span>100%正品保证 假一赔十</span>
                <span>寺库承诺所有在售商品均为正品，假一赔十</span>
            </p>
            </div> 
        </div>
    }
    changeNum({index,p_id,num}){
            this.props.dispatch(CartChangeNumActionCreator({index,p_id,num}))
    }
    changeRow({index,p_id,stateCode,p_num}){
            this.props.dispatch(CartSelectedActionCreator({index,p_id,stateCode,p_num}))
    }
    deleteItem({itemKey,delIndex}){
        Modal.alert("删除商品","您确定要删除商品吗？",[{text:"确定",onPress:()=>{
            this.props.dispatch(CartDeleteActionCreator({itemKey,delIndex}))
            }
        },{
            text:"取消"
        }])
        
    }
}
function mapStateToProps(state){
    return{
        cartData : state.cartReducer.cartData
    }
}
export default connect(mapStateToProps)(CartData)