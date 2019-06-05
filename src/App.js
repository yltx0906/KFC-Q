import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'

import './App.css';

import Product from './pages/Product'
import Category from './pages/Category'
import User from './pages/User'
import Order from './pages/Order'

import ProductForm from './pages/ProductForm'
import CategoryForm from './pages/CategoryForm'
import UserForm from './pages/UserForm'
import OrderForm from './pages/OrderForm'


import ProductDetails from './pages/ProductDetails'
import CategoryDetails from './pages/CategoryDetails'
import UserDetails from './pages/UserDetails'

// import OrderDetails from './pages/OrderDetails'
// import Memo from './pages/Memo'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* 左侧导航 */}
      <div className="nav_left">
        <div className="title">
          KFC-后台管理系统
        </div>
        <ul>
          <li>
            <Link to="/product">菜单管理</Link>
          </li>
          <li>
            <Link to="/user">用户管理</Link>
          </li>
          <li>
            <Link to="/category">分类管理</Link>
          </li>
          <li>
            <Link to="/order">订单管理</Link>
          </li>
          <li>
            <Link to="/memo">备忘录</Link>
          </li>
        </ul>
      </div>
      {/* 右侧内容 */}
      <div className="content_right">
      
        {/* 路由 */}
        <Switch>
          <Route path="/product" component={Product}/>
          <Route path="/category" component={Category}/>
          <Route path="/user" component={User}/>
          <Route path="/order" component={Order}/>

          <Route path="/categoryForm" component={CategoryForm}/>
          <Route path="/productForm" component={ProductForm}/> 
          <Route path="/productForm" component={UserForm}/>
          <Route path="/orderForm" component={OrderForm}/>

          <Route path="/productDetails" component={ProductDetails}/>
          <Route path="/categoryDetails" component={CategoryDetails}/>
          <Route path="/userDetails" component={UserDetails}/>
          {/* <Route path="/orderDetails" component={OrderDetails}/> */}
          {/* <Route path="/memo" component={Memo}/> */}
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;