import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import Home from './Home';
import Filter from './Filter';
import Detail from './Detail';
// import Header from './Header';
function Router(){
    return(
        <BrowserRouter>
        {/* <Route path ="*" component={Header}/> */}
        <Route exact path='/' component={Home}/>
        <Route path='/filter' component={Filter}/>
        <Route path='/detail' component={Detail}/>
        </BrowserRouter>
    )
}
export default Router;