import React,{Component} from 'react'
import {Link} from 'react-router'
import 'antd-mobile/dist/antd-mobile.css';
import './public.css'
class Header extends Component{
    render(){
        return <div className="header">
        <ul>
                <li className="header-btn">
                    {this.props.backBtn?<a href="javascript:window.history.go(-1);">{<img className="goBack" src="http://mpic.secooimg.com/zhuanti_pic/back@3x1.png" width="18" height="18"/>}</a>:""}
                </li>
                <li className="header-tit">{this.props.tit}</li>
                <li className="header-btn right_btn">
                     {this.props.rightBtn?this.props.rightBtn:<Link to="/" className="go_home"><img src="http://mpic.secooimg.com/zhuanti_pic/index@3x1.png"/></Link>}
                </li>
            </ul>
        </div>
    }
}
class FloatHeader extends Component {
	render() {
		return(
			<div id="index-page">
				<h1><img src="http://mstatic.secooimg.com/images/2017/11/08/load_logo.png" alt=""/></h1>
				<h2>寺库</h2>
				<p>新用户注册送1000元大礼包</p>
				<div>立即打开</div>
			</div>
		)
	}
}
class Content extends Component{
    render(){
        return <div className="content">
            {this.props.children}
        </div>
    }
}
class Footer extends Component{
    static defaultProps={
        footerList:[{listName:"首页",listPath:"/"},{listName:"尖货",listPath:"/tipgoods"},{listName:"分类",listPath:"/list"},{listName:"购物袋",listPath:"/cart"},{listName:"我的",listPath:"/mine"}]
    }
    render(){
        return <div className="footer">
            <ul>
                {this.props.footerList.map((ele,index)=>{
                    return <li activeClassName="active" key={index}><Link to={ele.listpath}>ele.listname</Link></li>
                })}
            </ul>
        </div>
    }
}
export {Header,FloatHeader,Content,Footer}