import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
