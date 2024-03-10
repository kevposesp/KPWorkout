import React, { useState } from 'react';
import classNames from 'classnames';
import { useCategory } from '@/hooks/useCategory';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ category, subItems }) => {

  const navigate = useNavigate();

  const handleCategory = (id) => {
    let filters = {
      categories: [id]
    }
    navigate(`/shop/${btoa(JSON.stringify(filters))}`);
  }

  return (
    <div className="relative group">
      <button className="px-4 py-2 hover:bg-gray-200 focus:outline-none" onClick={() => handleCategory(category.id)}>{category.title}</button>
      {subItems && (
        <div className="absolute hidden z-10 top-full left-0 bg-white shadow-md rounded-md group-hover:block">
          {subItems.map((item, index) => (
            <a key={index} className="block px-4 py-2 hover:bg-gray-200" onClick={() => handleCategory(item.id)}>{item.title}</a>
          ))}
        </div>
      )}
    </div>
  );
};

const Menu = () => {

  const { categories } = useCategory();

  return (
    <>
      <nav className="flex justify-center bg-gray-200 p-3 hidden sm:!flex">
        {categories.slice(0, 6).map((category, index) => (
          <MenuItem key={index} category={category} subItems={category.children_categories} />
        ))}
      </nav>
      <nav className="flex justify-center bg-gray-200 p-3 flex sm:!hidden">
        {categories.slice(0, 3).map((category, index) => (
          <MenuItem key={index} category={category} subItems={category.children_categories} />
        ))}
      </nav>
    </>
  );
};

export default Menu;
