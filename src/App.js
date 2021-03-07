import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
// import {Container} from 'react-bootstrap'
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import HomePage from './components/home/HomePage';
import { Route, Switch } from 'react-router-dom';
import BrowsePage from './components/browse/BrowsePage';
const App = () => {
  return (
    <div 
      className="d-flex"
      style = {{minHeight:"100vh", height:"auto"}}
    >
      <div className="w-100">
        <AuthProvider>
          <Switch>
            <Route exact path = "/" component={HomePage}/>
            <Route path = "/browse" component={BrowsePage}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </AuthProvider>
      </div>
    </div>


  )
}

export default App;
