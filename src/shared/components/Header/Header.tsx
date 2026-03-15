import Link from 'next/link';
import * as React from 'react';

import s from './Header.module.scss';
import DynamicFavoritesCounter from '../DynamicFavoritesCounter';
import FavoriteIcon from '../icons/FavoriteIcon';
import LogoIcon from '../icons/LogoIcon';
import PersonIcon from '../icons/PersonIcon';
import Text from '../Text';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header__logo}>
        <LogoIcon />
        <Text tag="p" view="p-20" weight="bold">
          <Link href="/">Food Client</Link>
        </Text>
      </div>
      <nav className={s.header__nav}>
        <ul className={s.header__list}>
          <li className={s['header__list-link']}>
            <Text tag="p" view="p-16">
              <Link href="/recipes">Recipes</Link>
            </Text>
          </li>
          <li className={s['header__list-link']}>
            <Text tag="p" view="p-16">
              <Link href="/categories">Meal Categories</Link>
            </Text>
          </li>
          <li className={s['header__list-link']}>
            <Text tag="p" view="p-16">
              Products
            </Text>
          </li>
          <li className={s['header__list-link']}>
            <Text tag="p" view="p-16">
              Menu Items
            </Text>
          </li>
          <li className={s['header__list-link']}>
            <Text tag="p" view="p-16">
              Meal Planning
            </Text>
          </li>
        </ul>
      </nav>
      <div className={s.header__personal}>
        <Link href="/favorites" className={s['header__personal-link']}>
          <FavoriteIcon color="accent" />
          <DynamicFavoritesCounter />
        </Link>
        <Link href="/" className={s['header__personal-link']}>
          <PersonIcon color="accent" />
        </Link>
      </div>
    </header>
  );
};

export default React.memo(Header);
