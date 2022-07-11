import React, { useEffect, useState } from 'react';
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import { PizzaBlock } from "../components/pizzaBlock/PizzaBlock";

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

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Array<ArrayItemsType>>([])
  const [categoryID, setCategoryID] = useState(0)
  const [sortType, setSortType] = useState<SortType>({ name: 'популярности', sort: 'rating' })
  useEffect(() => {
    setLoading(true)
    fetch(`https://62c3e72d7d83a75e39ea17ca.mockapi.io/items?${categoryID > 0 ? `category=${categoryID}` : ''}&sortBy=${sortType.sort}&order=desc`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        setItems(res)
        setLoading(false)
      })
  }, [categoryID, sortType])
  const onClickCategory = (value: number) => {
    setCategoryID(value)
  }
  const onClickSort = (value: { name: string, sort: string }) => {
    setSortType(value)
  }
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories onClickCategory={onClickCategory} value={categoryID}/>
          <Sort value={sortType} onClickSort={onClickSort}/>
        </div>

        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading ? [...new Array(10)].map((_, index) => <Skeleton key={index}/>) : items.map((item) => {
            return (

              <PizzaBlock key={item.id} id={item.id} img={item.imageUrl} title={item.title} price={item.price}
                          sizes={item.sizes} types={item.types}/>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;