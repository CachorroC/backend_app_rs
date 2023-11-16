'use client';

import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';
import typography from '#@/styles/fonts/typography.module.css';

export function CurrentRoute() {
  const pathname = usePathname();

  const segment = useSelectedLayoutSegments(
    'right'
  );

  return (
    <Fragment>
      {pathname.replace(
        '/', ' '
      )}
      {segment.map(
        (
          seg
        ) => {
          return (
            <div key={seg}>
              <h1 className={typography.headlineMedium}>{seg}</h1>
            </div>
          );
        }
      )}
    </Fragment>
  );
}
