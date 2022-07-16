import React, { useEffect, useState } from 'react';
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import { PizzaBlock } from "../components/pizzaBlock/PizzaBlock";
import { Pagination } from "../components/pagination/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCategoryID } from "../redux/slices/filterSlice";

type ArrayItemsType = {
  id: number,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number
}
type SortType = {
  name: string
  sort: string
}
type HomePropsType = {
  searchValue: string
}

const Home = ({ searchValue }: HomePropsType) => {
  const categoryID = useSelector((state: RootState) => state.filter.categoryID)
  const sortType = useSelector((state: RootState) => state.filter.sort)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Array<ArrayItemsType>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const category = categoryID > 0 ? `category=${categoryID}` : ''
  const search = searchValue ? `search=${searchValue}` : ''
  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    fetch(`https://62c3e72d7d83a75e39ea17ca.mockapi.io/items?page=${currentPage}&limit=4&${category}&${search}&sortBy=${sortType.sortType}&order=desc`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        setItems(res)
        setLoading(false)
      })
  }, [categoryID, sortType, searchValue, currentPage])
  const onClickCategory = (value: number) => {
    dispatch(setCategoryID(value))
  }
  const setCurrentPageHandler = (value: number) => {
    setCurrentPage(value)
  }
  const pizzas = items.map((item) => <PizzaBlock key={item.id} id={item.id} img={item.imageUrl} title={item.title}
                                                 price={item.price}
                                                 sizes={item.sizes} types={item.types}/>
  )
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories onClickCategory={onClickCategory} value={categoryID}/>
          <Sort/>
        </div>

        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading ? skeletons : pizzas}
        </div>
      </div>
      <Pagination setCurrentPageHandler={setCurrentPageHandler}/>
    </div>
  );
};

export default Home;