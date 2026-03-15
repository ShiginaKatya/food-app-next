'use client';
import Button from '@/shared/components/Button';
import Text from '@/shared/components/Text';

import s from './error.module.scss';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className={s.main}>
      <Text tag="h1" weight="bold" view="title">
        An error has occurred
      </Text>
      <Text view="p-20">{error.message}</Text>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
