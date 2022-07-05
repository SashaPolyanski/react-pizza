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

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Array<ArrayItemsType>>([])
  useEffect(() => {
    fetch('https://62c3e72d7d83a75e39ea17ca.mockapi.io/items')
      .then(res => {
        return res.json()
      })
      .then(res => {
        setItems(res)
        setLoading(false)
      })
  }, [])
  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading ? [...new Array(10)].map((_, index) => <Skeleton key={index} /> ): items.map((item) => {
          return (

            <PizzaBlock key={item.id} id={item.id} img={item.imageUrl} title={item.title} price={item.price}
                        sizes={item.sizes} types={item.types}/>
          )
        })}
      </div>
    </div>
  );
};

export default Home;