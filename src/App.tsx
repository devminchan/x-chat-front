import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import ChattingRoom from './pages/ChattingRoom/ChattingRoom';
import UserInfo from './pages/UserInfo';
import UserInfoFetcher from './UserInfoFetcher';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <UserInfoFetcher />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/rooms/:roomId" component={ChattingRoom} />
            <Route exact path="/users/me" component={UserInfo} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
