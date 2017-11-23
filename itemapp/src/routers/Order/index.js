import React,{Component} from "react"
import "./settlement.css"
import fetchJsonp from "fetch-jsonp"
class Header extends Component{
	render(){
		return <div id="settlementPage">
			<div className="header">
				<a  href="javaScript:window.history.go(-1);"><img src="http://mpic.secooimg.com/images/2017/09/29/icon-left.png" /></a>
				<span>结算中心</span>
			</div>
		</div>
	}
}
class SubHeader extends Component{
	render(){
		return <div>
			<div className="sub"><span>配送方式</span><span>快递送货   {">"}</span></div>
			<div className="shAdress">
				<div className="di">
				<img src="http://mpic.secooimg.com/images/2016/09/27/kongdizhi@2x1.png" />
				<span>您还没有收货地址,点击这里添加</span>
			</div>
				<div className="bgimg"></div>
			</div>
		</div>
	}
}
class Section extends Component{
	state={
		fuwuData:{}
	}
	render(){
		const {fuwuData} =this.state
		const youData=fuwuData&&fuwuData.ticket
		const fapiao=fuwuData&&fuwuData.invoice
		return (<div className="fuwu">
			<div className="youhui"><span>{youData&&youData.title}</span><span>{youData&&youData.valueDesc}  {">"}</span></div>
			<div className="fapiao"><span>{fapiao&&fapiao.title}</span><span>{fapiao&&fapiao.valueDesc}  {">"}</span></div>
		</div>)
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/cart/confirm?c_upk=2332e099ab2a484ab608c7e5c7659681%7C249950742671%7C94fb969340ad49578bbdaf2ec277ff56%7C139CF0CE6594738B3DC411D0C4257DDF&c_app_ver=5.6.0&c_channel=pc&c_platform_type=2&cart=%7B%22cartType%22%3A%22%22%2C%22shippingParam%22%3A%7B%7D%2C%22aid%22%3A%225%22%2C%22ticketParam%22%3A%7B%7D%2C%22customsParam%22%3A%7B%7D%2C%22invoiceParam%22%3A%7B%7D%2C%22deliverTypeParam%22%3A%7B%7D%7D&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
			this.setState({
				fuwuData:data
			})
		})
	}
}
class Shops extends Component{
	state={
		shopsData:{}
	}
	render(){
		const {shopsData}= this.state
		const shops=shopsData&&shopsData.cartItems
		const shopprice=shopsData&&shopsData.prices
		return <div className="bottom">
			<div className="shops"><span>{shops&&shops.commonCartCount}件商品</span></div>
			<ul className="imglist">{
				shops&&shops.commonCartItems.map((ele,index)=>{
					return <li key={index}><img src={ele.image} /></li>
				})
			}</ul>
			<div className="shopprice"><span>{shopprice&&shopprice.totalSecooPriceDesc}</span><span>￥{shopprice&&shopprice.totalSecooPrice}</span></div>
			<div>{shopprice&&shopprice.priceDetail.map((ele,index)=>{
				return (<div className="shopprice2" key={index}><span>{ele.name}</span><span>{ele.value}</span></div>)
			})}</div>
			<div id="footer2">
				<div className="shifu"><span>{shopprice&&shopprice.realCurrTotalPriceDesc} ￥{shopprice&&shopprice.realCurrentTotalPrice}</span><span className="youhuiP">优惠金额：￥{shopprice&&shopprice.totalFavoredAmount}</span></div>
				<div className="postDD">提交订单</div>
			</div>
		</div>
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/cart/confirm?c_upk=2332e099ab2a484ab608c7e5c7659681%7C249950742671%7C94fb969340ad49578bbdaf2ec277ff56%7C139CF0CE6594738B3DC411D0C4257DDF&c_app_ver=5.6.0&c_channel=pc&c_platform_type=2&cart=%7B%22cartType%22%3A%22%22%2C%22shippingParam%22%3A%7B%7D%2C%22aid%22%3A%225%22%2C%22ticketParam%22%3A%7B%7D%2C%22customsParam%22%3A%7B%7D%2C%22invoiceParam%22%3A%7B%7D%2C%22deliverTypeParam%22%3A%7B%7D%7D&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
			console.log(data.cart)
			this.setState({
				shopsData:data.cart
			})
		})
	}
}
class SettlementPage extends Component{
		render(){
			return (<div className="setllement">
				<Header />
				<SubHeader />
				<Section />
				<Shops />
			</div>)
		}
}
export default SettlementPage
