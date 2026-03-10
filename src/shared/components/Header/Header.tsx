import Link from 'next/link';
import * as React from 'react';

import classNames from 'classnames';

import s from './Header.module.scss';
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
          <a href="">Food Client</a>
        </Text>
      </div>
      <nav className={classNames(s.header__nav, s.nav)}>
        <ul className={s.nav__list}>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              <Link href="/recipes">Recipes</Link>
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              Meal Categories
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              Products
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              Menu Items
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              Meal Planning
            </Text>
          </li>
        </ul>
      </nav>
      <div className={s.header__personal}>
        <Link href="/favorites" className={s.header__personal__link}>
          <FavoriteIcon color="accent" />
        </Link>
        <Link href="/" className={s.header__personal__link}>
          <PersonIcon color="accent" />
        </Link>
      </div>
    </header>
  );
};

export default React.memo(Header);
