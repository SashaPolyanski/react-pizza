import React, { useEffect, useState } from 'react';
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import { PizzaBlock } from "../components/pizzaBlock/PizzaBlock";
import { Pagination } from "../components/pagination/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCategoryID, setPageCount } from "../redux/slices/filterSlice";
import axios from "axios";
import { fetchPizzas, setItems } from '../redux/slices/pizzasSlice';

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
type HomePropsType = {
  searchValue: string
}

const Home = ({ searchValue }: HomePropsType) => {
    const categoryID = useSelector((state: RootState) => state.filter.categoryID)
    const sortType = useSelector((state: RootState) => state.filter.sort.sortType)
    const currentPage = useSelector((state: RootState) => state.filter.pageCount)
    const items = useSelector((state: RootState) => state.pizza.items)
    const [loading, setLoading] = useState(true)
    // const [items, setItems] = useState<Array<ArrayItemsType>>([])
    const category = categoryID > 0 ? `category=${categoryID}` : ''
    const search = searchValue ? `search=${searchValue}` : ''
    const dispatch = useDispatch()


    useEffect(() => {
        setLoading(true)
        // dispatch(fetchPizzas({params : {currentPage, category, search, sortType}  }))
      // fetchPizzas()
        setLoading(false)
      }, [categoryID, sortType, searchValue, currentPage]
    )
// const res =  axios.get(`https://62c3e72d7d83a75e39ea17ca.mockapi.io/items?page=${currentPage}&limit=4&${category}&${search}&sortBy=${sortType}&order=desc`)
// setItems(res.data)
// setLoading(false)
// useEffect(()=>{
//   const queryString = qs.stringify({
//     categoryID,
//     sort: sortType.name,
//     currentPage
//   })
//   navigate(`?${queryString}`)
// },[categoryID, sortType.name, currentPage])
    const onClickCategory = (value: number) => {
      dispatch(setCategoryID(value))
    }
    const setCurrentPageHandler = (value: number) => {
      dispatch(setPageCount(value))
    }
    const pizzas = items && items.map((item) => <PizzaBlock key={item.id} id={item.id} img={item.imageUrl}
                                                            title={item.title}
                                                            price={item.price}
                                                            sizes={item.sizes} types={item.types}/>
    )
    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>)

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
        <Pagination currentPage={currentPage} setCurrentPageHandler={setCurrentPageHandler}/>
      </div>
    );
  }
;

export default Home;