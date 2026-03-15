'use client';

import dynamic from 'next/dynamic';

const DynamicProductsCounter = dynamic(() => import('../ProductsCounter'), { ssr: false });

export default DynamicProductsCounter;
