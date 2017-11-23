import React,{Component} from 'react'
import {Link} from 'react-router'
import {Header, Content} from '../../component/public'
import fetchJsonp from "fetch-jsonp"
import {connect} from 'react-redux'
import './list.css'
class ClassData extends Component{
    render(){
        return <div id="class_div">
            {this.props.classData.map((ele,index)=>{
                return <div key={index} className="classify">
                    <p className="class_tit"><a><span>{ele.name}</span> <span>{ele.enName}</span></a></p>
                    <ul >{(ele.child ? ele.child : []).map((ele,index)=>{
                        //+"-0-0-0-1-0-0-1-10-0-0-100-0"
                        return <li key={index} className={ele.key}><Link to={"/product/"+ele.value}>{ele.name}</Link></li>
                    })}</ul>
                </div>
            })}
        </div>
    }
}
class List extends Component{
    render(){
        const {classData} = this.props
        return <div id="list-page">
        <Header backBtn={true} tit={<nav className="nav_tit"><li><Link className="showActive">分类</Link></li><li><Link to="/category">品牌</Link></li></nav>}/>
        <Content>
            <ClassData classData={classData}/>
        </Content>
        </div>
    }
    componentDidMount(){
       this.getClassData()
    }
    getClassData(){
        fetchJsonp("http://android.secoo.com/appservice/cartAndBrand.action?v=2.0&_="+ new Date().getTime()).then(res=>res.json()).then(data=>{
            //console.log(data.rp_result.categorys)
            this.props.dispatch({type:"classify",payload:{classData:data.rp_result.categorys}})
        })
    }
}
function mapStateToProps(state){
    return {
            classData : state.reducer.classData
        }
}
export default connect(mapStateToProps)(List)