import React, { useState } from 'react';
import classNames from 'classnames';
import { useCategory } from '@/hooks/useCategory';

const MenuItem = ({ title, subItems }) => {
  return (
    <div className="relative group">
      <button className="px-4 py-2 hover:bg-gray-200 focus:outline-none">{title}</button>
      {subItems && (
        <div className="absolute hidden z-10 top-full left-0 bg-white shadow-md rounded-md group-hover:block">
          {subItems.map((item, index) => (
            <a key={index} className="block px-4 py-2 hover:bg-gray-200">{item.title}</a>
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
      <nav className="flex justify-center bg-gray-200 p-3 hidden sm:flex">
        {categories.slice(0, 6).map((item, index) => (
          <MenuItem key={index} title={item.title} subItems={item.children_categories} />
        ))}
      </nav>
      <nav className="flex justify-center bg-gray-200 p-3 block sm:hidden">
        {categories.slice(0, 3).map((item, index) => (
          <MenuItem key={index} title={item.title} subItems={item.children_categories} />
        ))}
      </nav>
    </>
  );
};

export default Menu;
