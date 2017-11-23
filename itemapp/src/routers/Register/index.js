import React,{Component} from 'react'
import {Header,Content} from '../../component/public'
import fetchJsonp from "fetch-jsonp"
import { List, InputItem,Button, WhiteSpace, WingBlank } from 'antd-mobile';
import './reg.css'
import hex_md5 from '../../component/md5'
import {Link} from 'react-router'
var reg = false;
class Register extends Component{
    state ={
        code:"",
        cck:"",
        stateCode:""
    }
    //http://m.secoo.com/mobileservice/user/send_phone_reg_validatenum?v=2.0&client=wap&phone=15249241307&deviceId=beb2ac1a-54bd-4df0-82ee-700ce0ddb241&imgCode=hxmf&cck=80a8519615984214bbed1d85552f1b61&_=1510632520925&callback=jsonp4
    render(){
        const {code,cck,stateCode} = this.state
        console.log(code)
        return <div id="register-page">
        <Header backBtn={true} tit="注册" rightBtn={<Link to="javascript:window.history.go(-1);">返回</Link>}/>
        <Content>
        <WingBlank>
        <p className="add_border"><InputItem
            id="phoneNum"
            placeholder="请输入手机号"
            clear
            moneyKeyboardAlign="left"
          ></InputItem></p>
          <div className="reg-hidden">
          <p className="add_border"><InputItem
            id="pass"
            type="password"
            placeholder="请输入密码"
            clear
            moneyKeyboardAlign="left"
          ></InputItem></p>
          <p className="get_code add_border"><InputItem
            id="validate_code"
            placeholder="短信验证码"
            clear
            moneyKeyboardAlign="left"
          ></InputItem><Button id="getCode"  onClick={()=>this.getMobileCode()}>获取验证码</Button></p>
          </div>
          <p className="get_code add_border"><InputItem
            id="val_code"
            placeholder="图形验证码"
            clear
            moneyKeyboardAlign="left"
          ></InputItem>
          <div onClick={()=>this.getValidateCode()}><img id="login_getCode" src={code}/></div></p>
          <div id="msg_tips" className=" reg-hidden"></div>
          <Button type="primary" onClick={()=>this.regClick()}>注册</Button><WhiteSpace />
          </WingBlank>
            <p className="register-info">注册代表您同意  <a href="userRegisterAgree2.html" target="_Blank">寺库奢侈品用户注册协议及隐私声明</a></p>
        </Content>
        </div>
    }
    componentDidMount(){
        this.getValidateCode()
    }
    regClick(){
        reg = !reg
        const {stateCode} = this.state
        var oShow = document.getElementsByClassName("reg-hidden")
        oShow[1].style.display = "block"
        var oInput = document.getElementById("phoneNum")
        var oPass = document.getElementById("pass")
        var oCode = document.getElementById("validate_code")
        if(/^\d{11}$/.test(oInput.value)){
            oShow[1].innerText = "* 验证码已发送到您的手机,请您查收！"
            oShow[0].style.display="block"
            if(reg){
            this.getMobileCode()
            }else if(stateCode){
                fetchJsonp("http://m.secoo.com/mobileservice/user/regist_by_phone?phone="+oInput.value+"&password="+hex_md5(oPass.value)+"&validateNum="+oCode.value+"&urlref=http%3A%2F%2Fm.secoo.com%3Fchannel%40_%40pc&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
                    if(data.rp_result.recode){
                        alert(data.rp_result.errorMsg)
                    }else{
                        window.location.href="home.html"
                    }
                }).catch(err=>console.log(err))
            }
        }else{
            oShow[1].innerText="* 请输入正确的手机号！"
            oShow[0].style.display="none"
        }
    }
    getMobileCode(){
        const {cck}=this.state
        console.log(cck)
        var phoneNum = document.getElementById("phoneNum").value
        var valCode = document.getElementById("val_code").value
        this.getValidateCode()
        fetchJsonp("http://m.secoo.com/mobileservice/user/send_phone_reg_validatenum?v=2.0&client=wap&phone="+phoneNum+"&deviceId=beb2ac1a-54bd-4df0-82ee-700ce0ddb241&imgCode="+valCode+"&cck="+cck+"&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
            console.log(data)
            this.setState({
                stateCode : data.rp_result.isNeedImgCode
            })
        }).catch(err=>console.log(err))
    }
    getValidateCode(){
        fetchJsonp("http://m.secoo.com/mobileservice/user/getImgValidateCode?v=2.0&client=wap&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
        var newData ="data:image/jpeg;base64," + data.rp_result.imgData.replace(/-/g,'+').replace(/_/g,"/")
        var cck = data.rp_result.cck
            this.setState({
                code:newData,
                cck:cck
            })
        })
    }
}
export default Register