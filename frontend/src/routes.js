import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Search from './pages/Search';
import Create from './pages/Create';
import Profile from './pages/Profile';
import NewActivity from './pages/NewActivity';
import EditActivity from './pages/EditActivity';
import EditProject from './pages/EditProject';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component ={Search}/>
        <Route path="/create" component ={Create}/>
        
        <Route path="/profile" component ={Profile}/>
        <Route path="/activity/new" component ={NewActivity}/>
        <Route path="/activity/edit" component ={EditActivity}/>
        <Route path="/projects/edit" component ={EditProject}/>
      </Switch>
    </BrowserRouter>
  );
}