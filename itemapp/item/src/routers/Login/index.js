import React,{Component} from 'react'
import {Header, Content} from '../../component/public'
import {Link} from 'react-router'
import fetchJsonp from "fetch-jsonp"
import { List, InputItem,Button, WhiteSpace, WingBlank } from 'antd-mobile';
import {connect} from 'react-redux'
import './login.css'
import qs from 'qs'
import hex_md5 from '../../component/md5'
class Login extends Component{
    state={
        code:"",
        cck:""
    }
    render(){
        const {code} = this.state
        return <div id="login-page">
        <Header backBtn={true} tit="登录" rightBtn={<Link to="/regist">立即注册</Link>}/>
        <Content>
        <div className="login_uri"><img src="//mpic.secooimg.com/images/2017/05/18/login_uri.png"/></div>
        <WingBlank>
        <p className="add_border"><InputItem
            id="phoneNum"
            placeholder="请输入手机号"
            clear
            moneyKeyboardAlign="left"
          ></InputItem></p>
          <p className="add_border"><InputItem
            id="pass"
            placeholder="请输入密码"
            type="password"
            clear
            moneyKeyboardAlign="left"
          ></InputItem></p>
          <p className="get_code add_border"><InputItem
            id="val_code"
            placeholder="图形验证码"
            clear
            moneyKeyboardAlign="left"
          ></InputItem>
          <div onClick={()=>this.getValidateCode()}><img id="login_getCode" src={code}/></div></p>
          <div id="msg_tips" className=" reg-hidden"></div>
          <Button type="primary" onClick={()=>this.loginClick()}>登录</Button><WhiteSpace />
          </WingBlank>
          <div className="login_list">
                    <img src="//mpic.secooimg.com/images/2017/05/10/qq_icon.png"/>
                    <span>QQ登录</span>
        </div>
        </Content>
        </div>
    }
    componentDidMount(){
        this.getValidateCode()
    }
    getValidateCode(){
        fetchJsonp("https://user-center.secoo.com/service/appapi/login/graph_captcha").then(res=>res.json()).then(data=>{
            var newData = "data:image/jpeg;base64,"+data.rp_result.imgData
            this.setState({
                code:newData,
                cck:data.rp_result.cck
            })
        })
    }
    loginClick(){
        const{cck}=this.state
        var oName = document.getElementById("phoneNum").value
        var oPass = document.getElementById("pass").value
        var oCode = document.getElementById("val_code").value
        fetch("/secoo/service/appapi/user/login",{
            method:"POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body:qs.stringify({
                userName:oName,
                password:hex_md5(oPass),
                verifyCode:oCode,
                cck:cck
            }),
            credentials:"include"
        })
    }
} 

export default Login