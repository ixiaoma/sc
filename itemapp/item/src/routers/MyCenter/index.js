import React,{Component} from "react"
import fetchJsonp from "fetch-jsonp"
import "./mycenter.css"
import {Header} from '../../component/public'
import {Link} from 'react-router'
class Section extends Component{
	render(){
		return <div className="content">
			<section id="userWrapper" className="eee_bg nowShowDiv wrappPageStyleComm">
  <div className="useCenter_list">
     <div id="uw_addr_list" className="useL_li">
	     <a>
		      <span className="usePic"><em className="use_zh">账号</em></span>
		      <p className="useText_r">
		         <span className="useLName">账户</span>
		         <span id="uUserName" className="useNameDate_r">{this.props.userPhone}</span>
		         <em className="jszx_right_bg youjiantou"></em>
		      </p>
		      <div className="clickShow_popupd"></div>
	      </a>
    </div>
    <div id="uw_order_list" className="useL_li">
      <a>
        <span className="usePic"><em className="use_dd">订单</em></span>
        <p className="useText_r">
           <span className="useLName">订单</span>
           <em className="jszx_right_bg youjiantou"></em>
        </p>
        <div className="clickShow_popupd"></div>
      </a>
    </div>
    <div id="uw_ticket_list" className="useL_li">
      <a href="ucticketList.html">
	      <span className="usePic"><em className="use_yhq">红包、优惠券</em></span>
	      <p className="useText_r">
	         <span className="useLName">红包、优惠券</span>
	         <em className="jszx_right_bg youjiantou"></em>
	      </p>
	      <div className="clickShow_popupd"></div>
      </a>
    </div>
  </div>
  <div className="useCenter_list">
    <div className="useL_li">
        <a href="auctionResultList.html">
          <span className="usePic"><em className="auction">我的竞拍</em></span>
          <p className="useText_r">
             <span className="useLName">我的竞拍</span>
             <em className="jszx_right_bg youjiantou"></em>
          </p>
          <div className="clickShow_popupd"></div>
      </a>
    </div>
     <div className="useL_li" id="auctionCoupon">
      <span className="usePic"><em className="auction-coupon">我的拍卖券</em></span>
      <p className="useText_r">
         <span className="useLName">我的拍卖券</span>
         <em className="jszx_right_bg youjiantou"></em>
      </p>
      <div className="clickShow_popupd"></div>
    </div>
  </div>
  <div className="useCenter_list">
     <div className="useL_li" id="uw_about_secoo">
      <a>
        <span className="usePic"><em className="use_gysk">关于寺库</em></span>
        <p className="useText_r">
           <span className="useLName">关于寺库</span>
           <em className="jszx_right_bg youjiantou"></em>
        </p>
        <div className="clickShow_popupd"></div>
      </a>
    </div>
    <div className="useL_li">
        <a>
          <span className="usePic"><em className="use_kfrx">客服热线</em></span>
          <p className="useText_r">
             <span className="useLName">客服热线</span>
             <span className="useNameDate_r">400 875 6789</span>
             <em className="jszx_right_bg youjiantou"></em>
          </p>
          <div className="clickShow_popupd"></div>
      </a>
    </div>
     <div className="useL_li">
      <a>
        <span className="usePic"><em className="use_hwg">海外站购买说明</em></span>
        <p className="useText_r">
           <span className="useLName">海外站购买说明</span>
           <em className="jszx_right_bg youjiantou"></em>
        </p>
        <div className="clickShow_popupd"></div>
      </a>
    </div>
  </div>
</section>
		</div>
	}
}
class Footer extends Component{
	render(){
		return (<div id="mycenter">
			<ul>
				<li><b className="b1"></b><p>首页</p></li>
				<li><b className="b2"></b><p>品牌</p></li>
				<li><b className="b3"></b><p>购物袋</p></li>
				<li><b className="b4"></b><p>我的寺库</p></li>
			</ul>
			<div className="adress">北京寺库商贸有限公司   联系电话：400 875 6789<br/>地址：北京市东城区朝阳门内大街银河SOHO C座15层</div>
		</div>)
	}
}
class CenterPage extends Component{
  state={
    user_phone:""
  }
	render(){
    const {user_phone} = this.state
		return <div className="xixi">
			<Header backBtn={true} tit="我的寺库" rightBtn={<Link to="/login" className="go_home distory"><div className="end" onClick={()=>this.distoryInfo()}></div></Link>}/>
			<Section userPhone={user_phone}/>
			<Footer />
		</div>
  }
  distoryInfo(){
      window.localStorage.clear();
      window.sessionStorage.clear();
  }
  componentDidMount(){
    fetchJsonp("https://m.secoo.com/getAjaxData.action?v=1.0&client=wap&urlfilter=userCenter.mo&method=secoo.user.get&fields=userId&userInfoVO.upKey=2332e099ab2a484ab608c7e5c7659681|249950742671|ea29d34b05c04f3cbd63020bc978e9a1|2A7834A271ED286D077DD47DD18A649D&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
      this.setState({
        user_phone:data.rp_result.mobliePhone
      })
    })
  }
}
export default CenterPage