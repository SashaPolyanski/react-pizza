import React from "react";

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const categories = ['Все' , 'Мясные' , 'Вегетарианская', 'Гриль' , 'Острые' , 'Закрытые' ,]
  const onClickCategory = (value: number) => {
    setActiveIndex(value)
  }
  return (
    <div className="categories">
      <ul>
        {categories.map((categ, index)=>{
          return(
            <li onClick={()=>onClickCategory(index)} className={activeIndex === index ? "active" : ''}>{categ}</li>
          )
        })}
      </ul>
    </div>
  )
}