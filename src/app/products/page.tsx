import type { Metadata } from 'next';

import ProductsClient from './_components/ProductsClient';

export const metadata: Metadata = {
  title: 'Food Client | Products',
  description: 'Your shopping list for recipes',
  robots: {
    index: false,
    follow: false,
  },
};

const ProductsPage = () => {
  return <ProductsClient />;
};

export default ProductsPage;
