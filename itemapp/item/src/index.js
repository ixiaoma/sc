import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router,Route,hashHistory} from 'react-router';
import store from './store'
import HomePage from './routers/Home'
import LoginPage from './routers/Login'
import RegisterPage from './routers/Register'
import CartPage from './routers/Cart'
import ListPage from './routers/List'
import ProductPage from './routers/ListView'
import CategoryPage from './routers/Category'
import DetailPage from './routers/Detail'
import MinePage from './routers/MyCenter'
import OrderPage from './routers/Order'
ReactDOM.render(<Provider store={store}>
                    <Router history={hashHistory}>
                        <Route path="/" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/regist" component={RegisterPage}/>
                        <Route path="/cart" component={CartPage}/>
                        <Route path="/list" component={ListPage}/>
                        <Route path="/category" component={CategoryPage}/>
                        <Route path="/product(/:id)" component={ProductPage}/>
                        <Route path="/detail(/:id)" component={DetailPage}/>
                        <Route path="/mine" component={MinePage}/>
                        <Route path="/order" component={OrderPage}/>
                    </Router>
                </Provider>
, document.getElementById('root'));
