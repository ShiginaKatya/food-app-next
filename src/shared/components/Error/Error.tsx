'use client';
import Button from '../Button';
import Text from '../Text';
import s from './Error.module.scss';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <main className={s.main}>
      <Text tag="h1" weight="bold" view="title">
        An error has occurred
      </Text>
      <Text view="p-16" color="secondary">
        {error.message}
      </Text>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
};

export default Error;
