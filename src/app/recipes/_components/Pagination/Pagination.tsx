'use client';
import { useMemo } from 'react';

import classNames from 'classnames';

import ArrowDownIcon from '@components/icons/ArrowDownIcon';

import s from './Pagination.module.scss';

type Props = {
  stopPage: number;
  allPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ stopPage, allPages, onPageChange }: Props) => {
  const paginatePages = useMemo(() => {
    const delta = 2;
    const pagesList = [];
    for (let i = 1; i <= allPages; i++) {
      if (i === 1 || i === allPages || (i >= stopPage && i <= stopPage + delta)) {
        pagesList.push(i);
      } else if (pagesList[pagesList.length - 1] !== '...') {
        pagesList.push('...');
      }
    }
    return pagesList;
  }, [stopPage, allPages]);
  return (
    <div className={s.paginate}>
      <button
        className={classNames(s.paginate__arrow, s.paginate__arrow_left)}
        onClick={() => onPageChange(stopPage - 1)}
        disabled={stopPage === 1}
      >
        <ArrowDownIcon color="primary" />
      </button>
      {paginatePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={classNames(s.paginate__numbers, {
            [s.paginate__numbers_active]: page === stopPage,
          })}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      <button
        className={classNames(s.paginate__arrow, s.paginate__arrow_right)}
        onClick={() => onPageChange(stopPage + 1)}
        disabled={stopPage === allPages}
      >
        <ArrowDownIcon color="primary" />
      </button>
    </div>
  );
};

export default Pagination;
