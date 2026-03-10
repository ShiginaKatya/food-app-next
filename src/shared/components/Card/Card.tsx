'use client';
import Image from 'next/image';
import * as React from 'react';

import classNames from 'classnames';

import Text from '../Text';
import s from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={classNames(s.card, className)} onClick={onClick}>
      <Image
        loading="lazy"
        src={image}
        width={400}
        height={300}
        className={s.card__image}
        alt="image"
      />
      <ul className={s.card__content}>
        <li className={s.card__texts}>
          {captionSlot && (
            <Text view="p-14" tag="p" color="secondary" weight="medium">
              {captionSlot}
            </Text>
          )}
          <Text view="p-20" tag="p" color="primary" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text view="p-16" tag="p" color="secondary" weight="normal" maxLines={3}>
            {subtitle}
          </Text>
        </li>
        <li className={s.card__footer}>
          {contentSlot && (
            <Text view="p-18" tag="p" color="accent" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot}
        </li>
      </ul>
    </div>
  );
};

export default React.memo(Card);
