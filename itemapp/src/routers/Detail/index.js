import React,{Component} from "react"
import fetchJsonp from "fetch-jsonp"
import {Link} from "react-router"
import "./detail.css"
import {FloatHeader} from "../../component/public"
import Swiper from "swiper"
class SubHeader extends Component{
	render(){
		const scrollTop=document.body.scrollTop
		return (<ul className="nav">
			<li className="tu1"><a href="javaScript:window.history.go(-1)"><img src="http://mpic.secooimg.com/images/2017/09/29/icon-left.png" /></a></li>
			<li>商品</li>
			<li>评论</li>
			<li>详情</li>
			<li>推荐</li>
			<li className="tu"><Link to="/"><img src="http://mpic.secooimg.com/images/2017/09/29/icon-home.png" /></Link></li>
		</ul>
		)
	}
}
class Banner extends Component{
	state={
		lunData:[]
	}
	render(){
		const {lunData}=this.state
		return <div className="banner2">
			<div className="swiper-container">
				<div className="swiper-wrapper">{
					lunData&&lunData.map((ele,index)=>{
						return <div key={index} className="swiper-slide"><img src={ele} /></div>
					})
				}</div>
				<div className="swiper-pagination"></div>
			</div>
		</div>
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/product/detail_new?upk=&productId="+this.props.id+"&size=2&c_platform_type=0"+ new Date().getTime()).then(res=>res.json()).then(data=>{
			this.setState({
				lunData:data.productInfo.imgList
			})
		})
	}
	componentDidUpdate(){
		var mySwiper=new Swiper(".swiper-container",{
			loop:true,
			pagination:{
				el:".swiper-pagination"
			}
		})
	}
}
class Section extends Component{
	state={
		sectionData:{}
	}
	render(){
		const {sectionData}=this.state
		const price=sectionData.priceInfo
		return (<div className="section">
			<div className="price">{price&&price.nowPrice}</div>
			<div className="name"><span>Longchamp/珑骧</span>{sectionData.title}</div>
			<p className="fa">{sectionData.areaName} {sectionData.deliverInfo}</p>
				<div className="xin"><span>分期付款</span><i>0首付12期免息,开通领礼券</i></div>
				<div className="xin"><span>到店自提</span><i>查看店铺地址</i></div>
				<div className="xin"><span>微信管家</span><i>点击复制管家微信号</i></div>
		</div>)
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/product/detail_new?upk=&productId="+this.props.id+"&size=2&c_platform_type=0&_="+ new Date().getTime()).then(res=>res.json()).then(data=>{
			this.setState({
				sectionData:data.productInfo
			})
		})
	}
}
class Color extends Component{
	state={
		colorData:[]
	}
	render(){
		const {colorData} = this.state
		return (<div className="color">
			<h3>颜色</h3>
			<ul className="yan">{
				colorData.map((ele,index)=>{
				return <li className="se" key={index}>{ele.title}</li>
			})
			}</ul>
			<ul className="zheng">
				<li><img src="http://mpic.secooimg.com/images/2017/08/14/zhengpindetail@2x.png" /><span>假一赔十</span></li>
				<li><img src="http://mpic.secooimg.com/images/2017/02/09/no_deliver_fee@2x.png" /><span>会员免邮</span></li>
				<li><img src="http://mpic.secooimg.com/images/2017/02/09/identity@2x.png" /><span>权威鉴定</span></li>
				<li><img src="http://mpic.secooimg.com/images/2017/02/09/exchange@2x.png" /><span>七天退换</span></li>
				<li className="jian"><img src="http://mpic.secooimg.com/images/2017/09/29/icon-right.png" /></li>
			</ul>
		</div>)
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/product/spec_new?upk=&productId=19862014&size=2&c_platform_type=0&_="+ new Date().getTime()).then(res=>res.json()).then(data=>{
			this.setState({
				colorData:data.productSpec[0].values
			})
		})
	}
}
class Shop extends Component{
	state={
		shopData:{}
	}
	render(){
		const {shopData} =this.state
		const attrList=shopData.attrList
		return (<div className="shop">
			<h2>商品信息</h2>
			<table className="shopInfo"><tbody>{
				attrList&&attrList.map((ele,index)=>{
					return <tr key={index}><td>{ele.name}</td><td>{ele.value}</td></tr>
				})		
			}</tbody></table>
		</div>)
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/product/detail_new?upk=&productId="+this.props.id+"&size=2&c_platform_type=0").then(res=>res.json()).then(data=>{
			this.setState({
				shopData:data.productInfo
			})
		})
	}
}
class ShopDetail extends Component{
	state={
		shopData:[]
	}
	render(){
		const {shopData} =this.state
		return (<div className="shopDetil">
			<h2>商品详情</h2>
			<ul>{
				shopData.map((ele,index)=>{
				return<li key={index}>
					{ele.width ? <img src={ele.info} width={ele.width} height={ele.height}/>:<span>{ele.info}</span>}
				</li>
				})		
			}</ul>
		</div>)
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/product/detail_new?upk=2332e099ab2a484ab608c7e5c7659681%7C249950742671%7Cea29d34b05c04f3cbd63020bc978e9a1%7C2A7834A271ED286D077DD47DD18A649D&productId="+this.props.id+"&size=2&c_platform_type=0&_="+ new Date().getTime()).then(res=>res.json()).then(data=>{
		this.setState({
				shopData:data.productInfo.detail
			})
		})
	}
}
class YangHu extends Component{
	state={
		yangData:{}
	}
	render(){
		const {yangData} =this.state
		//console.log(yangData)
		return (<div>{yangData&&
			<div className="yangHu">
			<h2>养护常识</h2>
			 <div>{yangData.info}</div>	
			</div>}
		</div>)
	}
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/product/detail_new?upk=&productId="+this.props.id+"&size=2&c_platform_type=0").then(res=>res.json()).then(data=>{
		this.setState({
				yangData:data.maintainInfo.detailList&&data.maintainInfo.detailList[0]
			})
		})
	}
}
class Quality extends Component{
	state={
		qualityData:[]
	}
	render(){
		const {qualityData} =this.state
		return (<div className="quality">
			<p className="title1">-精品推荐-</p>
			<ul>{
				qualityData.map((ele,index)=>{
					return <li key={index}><img src={"http://pic.secoo.com/product/300/300/"+ele.picUrl}/><span>{ele.name}</span><p>￥{ele.secooPrice}</p></li>
				})
			}</ul>
		</div>)
	}
	componentDidMount(){
		fetchJsonp("https://lr.secooimg.com/recommend?upk=&productId="+this.props.id+"&size=2&c_platform_type=0&type=similar&count=12&platformType=2&categoryId=31&brandId=194").then(res=>res.json()).then(data=>{
			//console.log(data.productList)
			this.setState({
				qualityData:data.productList
			})
		})
	}
}
class Footer extends Component{
	state={
		pro_num:""
	}
	render(){
		const {pro_num} = this.state
		return (<div className="zu">
			<Link to="/cart"><img src="http://mpic.secooimg.com/images/2017/09/29/icon-bag.png" /><i>{pro_num}</i></Link>
			<div>
				<p className="gou"><Link onClick={()=>this.addCart()}>加入购物袋</Link></p>
				<p className="mai">立即购买</p>
			</div>
		</div>)
	}
	addCart(){
		fetchJsonp("http://las.secoo.com/api/cart/cart?upk=2332e099ab2a484ab608c7e5c7659681%7C249950742671%7Cea29d34b05c04f3cbd63020bc978e9a1%7C2A7834A271ED286D077DD47DD18A649D&productId="+this.props.id+"&size=2&c_platform_type=0&action=1&aid=5&addType=&cartType=0&client=wap&openCloud=1&v=2.0&isChecked=1&addFrom=proDetail_1217&c_upk=2332e099ab2a484ab608c7e5c7659681%7C249950742671%7Cea29d34b05c04f3cbd63020bc978e9a1%7C2A7834A271ED286D077DD47DD18A649D&quantity=1&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
			console.log(data.cart.commonTotalCount)
			this.setState({
				pro_num:data.cart.commonTotalCount
			})
		})
	} 
}
class DetailPage extends Component{
	render(){
		var id = this.props.params.id
		return <div>
			<div className="tou"><FloatHeader /></div>
			<SubHeader />
			<Banner id={id}/>
			<Section id={id}/>
			<Color />
			<Shop id={id}/>
			<ShopDetail id={id}/>
			<YangHu id={id}/>
			<Quality id={id}/>
			<Footer id={id}/>
		</div>
	}
}
export default DetailPage