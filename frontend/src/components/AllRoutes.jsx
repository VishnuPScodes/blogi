import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
function AllRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

    </Routes>
  );
}

export default AllRoutes;
