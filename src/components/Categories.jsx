import React from 'react';

function Categories({ categoryId, onClick }) {
  // пропихивание стейта { categoryId, onClick }

  const list = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {list.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClick(index)}
            className={categoryId === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
