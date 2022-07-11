import React from "react";

type CategoryPropsType = {
  value: number
  onClickCategory: (id: number) => void
}

export const Categories = ({value, onClickCategory}:CategoryPropsType) => {
  const categories = ['Все' , 'Мясные' , 'Вегетарианская', 'Гриль' , 'Острые' , 'Закрытые' ,]
  return (
    <div className="categories">
      <ul>
        {categories.map((categ, index)=>{
          return(
            <li key={index} onClick={()=>onClickCategory(index)} className={value === index ? "active" : ''}>{categ}</li>
          )
        })}
      </ul>
    </div>
  )
}