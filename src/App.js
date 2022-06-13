import React from "react";

import { QueryClientProvider, QueryClient } from "react-query";

//import router
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

//import components*

import Home from "./view/Home";


const Main = () => {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />      
      </Routes>
    </>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
