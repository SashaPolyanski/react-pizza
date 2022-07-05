import React from 'react';
import s from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return (
    <div className={s.title}>
      <p>К сожалению данная страница отсутствует в нашем магазине</p>
    </div>
  );
};

export default NotFoundPage;