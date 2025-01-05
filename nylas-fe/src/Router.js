import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
    </Routes>
  );
};

export default Router;
