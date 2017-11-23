import React,{Component} from 'react'
import {Link} from 'react-router'
import {Header, Content} from '../../component/public'
import fetchJsonp from "fetch-jsonp"
import {connect} from 'react-redux'
class BrandData extends Component{
    render(){
        return <div id="brand_div">
            <div className="brand_view">
                {this.props.brandData.map((ele,index)=>{
                    return  <li key={index}><a href="javascript:;">{ele.cap}</a></li>
                })}
            </div>
            {this.props.brandData.map((ele,index)=>{
                return <div key={index} className="brands">
                <p className="brand_tit">{ele.cap}</p>
                <ul>{(ele.list ? ele.list : []).map((ele,index)=>{
                    return <Link to={"/product/"+ele.brandId} key={index}><li><span>{ele.cname}</span><span>{ele.ename}</span></li></Link>
                })}</ul>
                </div>
            })}
        </div>
    } 
}
class Category extends Component{
    render(){
        const {brandData} = this.props
        return <div id="list-page">
        <Header backBtn={true} tit={<nav className="nav_tit"><li><Link to="/list">分类</Link></li><li><Link className="showActive">品牌</Link></li></nav>}/>
        <Content>
            <BrandData brandData={brandData}/>
        </Content>
        </div>
    }
    componentDidMount(){
       this.getBrandData()
    }
    getBrandData(){
        fetchJsonp("http://android.secoo.com/appservice/all_brand.action?_="+ new Date().getTime()).then(res=>res.json()).then(data=>{
            //console.log(data)
            this.props.dispatch({type:"brands",payload:{brandData:data.rp_result.brands}})
        })
    }
}
function mapStateToProps(state){
    return {
            brandData : state.reducer.brandData
        }
}
export default connect(mapStateToProps)(Category)