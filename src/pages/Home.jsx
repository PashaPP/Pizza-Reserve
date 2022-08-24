import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ search }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0); // Забрали стейт из компонента КАТЕГОРИИ
  const [currentPage, setCurrentPage] = React.useState(1); // Пагинация
  const [sortType, setSortType] = React.useState({
    name: 'популярности', //Делаем категорию "популярности" по дефолту
    sort: 'rating',
  }); // Забрали стейт из компонента СОРТ

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : ''; // так как нет нолевой категории выводятся все пиццы
    const sortiruemSortBy = sortType.sort.replace('-', ''); // Просто удаление минуса из свойства
    const zayavlaemOrder = sortType.sort.includes('-') ? 'asc' : 'desc'; //Проверка, есть ли в сортировке минус, если есть - АСК, если нет - ДЕСК
    const poisk = search ? `&search=${search}` : '';

    fetch(
      `https://62f507b1535c0c50e76825e7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortiruemSortBy}&order=${zayavlaemOrder}${poisk}`,
    )
      .then((response) => response.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0); //Скролл страницы
  }, [categoryId, sortType, search, currentPage]); //Зависимость, если будет меняться категории и сортировка - делаем запрос ФЕТЧ на получение новых пицц.

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(search.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClick={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} onClick={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination noChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
