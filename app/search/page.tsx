// app/search/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import SearchPageComponent from '@/components/SearchPageComponent';
import { Suspense } from 'react';

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <SearchPageComponent />
    </Suspense>
  );
}
