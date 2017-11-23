import React, { Component } from "react"
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"
import "./index.css"
import fetchJsonp from "fetch-jsonp"      //jsonp获取数据方式下载这个插件
import { Link } from "react-router"		 //相当于a标签
import {FloatHeader} from "../../component/public"
class SubHeader extends Component {
	state = {
		subData: []
	}
	render() {
		const { subData } = this.state;
		return(
			<ul id="subhead">{
				subData.map((ele,index)=>{
					return <li key={index}><div><img src={ele.img} alt=""/></div><span>{ele.title}</span></li>
				})
			}</ul>
		)
	}
	componentDidMount() {    //每个组件获取数据必须单独写componentDidMount
		fetchJsonp("http://las.secoo.com/api/home/home_page?c_app_ver=1.0.0&c_platform_type=3").then(res => res.json()).then(data => {
			this.setState({
				subData: data.floors[1].list
			})
		})
	}
}
class Footer extends Component {
	static defaultProps = {   //设置初始this.props值
		footerData: [
			{ footName: "首页", icon: "http://mpic.secooimg.com/images/2017/08/01/1.png", pathUrl: "/" },
			{ footName: "尖货", icon: "http://mpic.secooimg.com/images/2017/08/01/2.png", pathUrl: "/" },
			{ footName: "分类", icon: "http://mpic.secooimg.com/images/2017/08/01/3.png", pathUrl: "/list" },
			{ footName: "购物袋", icon: "http://mpic.secooimg.com/images/2017/08/01/4.png", pathUrl: "/cart" },
			{ footName: "我的", icon: "http://mpic.secooimg.com/images/2017/08/01/5.png", pathUrl: "/mine" }
		]
	}
	render() {
		return(
			<div id="footer">
				<ul>{
					this.props.footerData.map((ele,index)=><li key={index}><Link to={ele.pathUrl}><div><img src={ele.icon}/></div><span>{ele.footName}</span></Link></li>)
				}</ul>
			</div>
		)
	}
}
class Content extends Component {
	state = {
		contentData: []
	}
	render() {
		const { contentData } = this.state;
		const datas = []   //定义一个空数组用来push获取的数据
		contentData.map((ele, index) => {
			ele.type ==15 && datas.push(ele.content) //判断获取特定数据
		})
		const categoryData = []
		contentData.map((ele, index) => {
			ele.type == 16 && categoryData.push(ele.content)
		})
		const jingxuanData = []
		contentData.map((ele, index) => {
			ele.type == 17 && jingxuanData.push(ele.content)
		})
		return <div className="main">{
			datas.map((ele,index)=>{
				return <div className="content" key={index}><img src={ele.img} /></div>	
			})
		}
		<div className="category">分类 CAIEGORY</div>
		<div>{
			categoryData.map((ele,index)=>{
				return <div key={index} className="fenlei"><img src={ele.img} />
				<div className="title"><p>{ele.title}</p><p className="subTitle">{ele.subTitle}</p></div>
				</div>
			})
		}
		</div>
		<div className="jingxuan">每周精选 COLLECTION</div>
		<div>{
			jingxuanData.map((ele,index)=>{
				return <div className="coll" key={index}><img src={ele.img} /></div>
			})
		}</div>
		</div>
	}
	componentDidMount() {
		fetchJsonp("http://las.secoo.com/api/home/home_page?c_app_ver=1.0.0&c_platform_type=3").then(res=> res.json()).then(data => {
			this.setState({
				contentData: data.floors
			})
		})
	}
}
class Banner extends Component {
	state = {
		bannerData: []
	}
	render() {
		const { bannerData } = this.state;
		return(
			<div className="banner">
			<div className="swiper-container">
				<div className="swiper-wrapper">{
					bannerData.map((ele,index)=>{
						return <div className="swiper-slide" key={index}><img src={ele.img} /></div>
					})
				}</div>
				<div className="swiper-pagination"></div>
			</div>
			</div>
		)
	} //获取数据
	componentDidMount(){
		fetchJsonp("http://las.secoo.com/api/home/home_page?c_app_ver=1.0.0&c_platform_type=3").then(res => res.json()).then(data => {
			this.setState({
				bannerData: data.floors[0].list
			})
		})
	}
	componentDidUpdate() {
		var mySwiper = new Swiper('.swiper-container', {
			loop: true,
			pagination: {
				el: ".swiper-pagination"
			}
		})
	}
}
class IndexPage extends Component {
	render() {
		return(
			<div id="home">
				<FloatHeader/>
				<Footer />
				<Banner />
				<SubHeader />
				<Content />
			</div>
		)
	}
}
export default IndexPage