import Text from '@/shared/components/Text';

import s from './error.module.scss';

export default function NotFound() {
  return (
    <main className={s.main_error}>
      <Text view="title" weight="bold">
        Page not found 404
      </Text>
    </main>
  );
}
