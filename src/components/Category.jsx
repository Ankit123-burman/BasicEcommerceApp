import React from 'react';

export default function Category({ finalcategory, setCatname }) {
  const handleClick = (categoryName) => {
    console.log('Category clicked:', categoryName); // Debugging line
    setCatname(categoryName);
  };

  const cat = finalcategory.map((category) => {
    return (
      <li
        onClick={() => handleClick(category.name)} // Pass only the category name
        key={category.id} // Use a unique identifier if available
        className='bg-[#ccc] p-[7px] cursor-pointer text-[20px] font-serif font-[500] mb-2'
      >
        {category.name}
      </li>
    );
  });

  return (
    <div>
      <h3 className='text-[25px] font-bold p-[10px]'>Category</h3>
      <ul>
        {cat}
      </ul>
    </div>
  );
}
