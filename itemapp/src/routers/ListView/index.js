import React,{Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import {Header,Content} from '../../component/public' 
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {ListView} from 'antd-mobile';
import './product.css'
class SubHeader extends Component{
    render(){
        return <div className="sub_header">
        <span>综合</span><span>品牌</span><span>筛选</span>
        </div>
    }

}
class Product extends Component{
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          })
          this.state = {dataSource : ds.cloneWithRows([]),pageIndex:1}
      }
    render(){
        const {productData} = this.props
        //console.log(productData)
        const dataSource =this.state.dataSource.cloneWithRows(productData)
        //console.log(dataSource)
        return <div id="productPage"><Header backBtn={true} tit={<hgroup className="pagesTitles">
        <input type="text" placeholder="搜索商品和品牌" className="siteWrapper"/>
        <span className="search-icon search-open"></span>
    </hgroup>} />
        <Content>
        <SubHeader/>
        <ListView 
        dataSource={dataSource}
        className="list-wrap"
        onEndReached={()=>this.loadMore()}
        renderRow={(rowData)=> <Link to={"/detail/"+rowData.productId}>
                    <ul  className="pro_list">
                    <li><img src={rowData.imgUrl ? "http://pic.secoo.com/product/200/200/"+rowData.imgUrl : ""}/></li>
                    <li className="msg"><h6>{rowData.productName}</h6><p><span>￥</span>{rowData.refPrice}</p></li>
                    </ul>
                   </Link>
        }/>
        </Content>
        </div>
    }
    loadMore(){
        this.getProductData(true)
    }
    getProductData(more){
        if(more){
        this.state.pageIndex++
        }else{
            this.state.pageIndex =1;
        }
        //console.log(this.state.pageIndex)
        var params = this.props.params
        //console.log(params.id)
       if(params.id.indexOf("_")){
        fetchJsonp("http://m.secoo.com/appservice/search_cateGoods.action?categoryId=0&brandId="+params.id+"&orderType=1&currPage="+this.state.pageIndex+"&st=10&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
            //console.log(data.rp_result.productlist)
            this.props.dispatch({type:"addProduct",payload:{productData:data.rp_result.productlist,more}})
        })
        }else{
            fetchJsonp("http://m.secoo.com/appservice/search_cateGoods.action?categoryId="+params.id+"&orderType=1&currPage="+this.state.pageIndex+"&st=10&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
                //console.log(data.rp_result.productlist)
                this.props.dispatch({type:"addProduct",payload:{productData:data.rp_result.productlist,more}})
            })
        }
    }
    componentDidMount(){
        this.getProductData()
        // fetchJsonp("http://m.secoo.com/appservice/search_cateGoods.action?categoryId=0&orderType=1&currPage=1&st=10&_="+new Date().getTime()).then(res=>res.json()).then(data=>{
        //     console.log(data.rp_result.filterlist)
        //     this.props.dispatch({type:"FilterList",payload:{filterData:data.rp_result.filterlist}})
        // })
    }
}
function mapStateToProps(state){
    return {productData : state.reducer.productData}
}
export default connect(mapStateToProps)(Product)