import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Index from "./pages/index";


import CreateItem from "./pages/CreateItem";

import Items from "./pages/Items";
import EditItems from "./pages/EditItem.jsx";
import ItemSingleView from "./pages/ItemSingleView.jsx";
import Settings from "./pages/Settings.jsx";
import Reports from "./pages/Reports.jsx";
import Categories from "./pages/Categories.jsx";
import Suppliers from "./pages/Suppliers.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Index />} />
         <Route path="/EditItems" element={<EditItems/>} />
      
      <Route path="/create-item" element={<CreateItem />} />
   
      <Route path="/items" element={<Items />} />

      <Route path="/items-single-view" element={<ItemSingleView />} />

      
      <Route path="/Settings" element={<Settings />} />



      <Route path="/reports" element={<Reports />} />

       <Route path="/categories" element={<Categories />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
