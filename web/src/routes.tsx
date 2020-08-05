import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/landing/index';
import TeacherList from './pages/TeacherList/index';
import TeacherForm from './pages/TeacherForm/index';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" exact component={TeacherList} />
            <Route path="/give-classes" exact component={TeacherForm} />
        </BrowserRouter>
    );
}

export default Routes;
