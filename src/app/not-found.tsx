import Text from '@/shared/components/Text';

import s from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={s.main}>
      <Text view="title" weight="bold">
        Page not found 404
      </Text>
    </main>
  );
}
