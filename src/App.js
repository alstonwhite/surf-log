import React from 'react'
import { Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Signup from './components/Signup'
import Login from './components/Login'
import { AuthProvider } from './contexts/AuthContext';
import ProfileDashboard from './components/ProfileDashboard'
import ForgotPassword from './components/ForgotPassword'
import UpdateProfile from './components/UpdateProfile'
import PrivateRoute from './components/PrivateRoute'
import SurfLogContainer from './components/surf-log/SurfLogContainer';

function App() {

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div classname="w-100">
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={SurfLogContainer}/>
                <PrivateRoute path="/profile" component={ProfileDashboard}/>
                <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                <Route path = "/signup" component={Signup}/>
                <Route path = "/login" component={Login}/>
                <Route path = "/forgot-password" component={ForgotPassword}/>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  );
}

export default App;
