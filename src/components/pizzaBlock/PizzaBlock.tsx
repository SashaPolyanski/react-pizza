import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";


type PizzaBlockType = {
  title: string,
  price: number,
  img: string
  sizes: number[]
  types: number[]
  id: number
}

export const PizzaBlock: FC<PizzaBlockType> = ({ title, price, img, sizes, types, id }) => {
  const typesNames = ['Тонкое', 'Традиционное']
  const count = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === id))
  const dispatch = useDispatch()
  console.log(count)
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)
  const onClickAdd = () => {
    const item = {
      id,
      price,
      title,
      img,
      type: typesNames[activeType],
      size: sizes[activeSize]
    }
    dispatch(addItem(item))
  }
  const pizzaCount = count ? count.count : 0
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          src={img}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => <li key={index} className={activeType === index ? "active" : ''}
                                            onClick={() => setActiveType(index)}>{typesNames[type]}
            </li>)}
          </ul>
          <ul>
            {sizes.map((size, index) => <li key={index} className={activeSize === index ? "active" : ''}
                                            onClick={() => setActiveSize(index)}>{size}
            </li>)}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {pizzaCount > 0 && <i>{pizzaCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

