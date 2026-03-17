'use client';
import Error from '@components/Error';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <Error error={error} reset={reset} />;
};

export default ErrorPage;
