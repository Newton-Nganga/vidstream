// useBreadcrumb.tsx

// "use client"
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

type BreadcrumbItem = {
  label: string | any;
  link: string | any;
};

const useBreadcrumb = (): BreadcrumbItem[] => {
const pathname = usePathname()
const trimmedPath = pathname.replace(/^\/|\/$/g, '');
const segments = trimmedPath.split('/');

let links = []

for(let i = 0; i < segments.length - 1;i++){
   if(i === 0){
    links.push({
        label:segments[0],
        link:`/${segments[0]}/`
    })
   }
   links.push({
    label:segments[i],
    link: `${links[i-1]}/${segments[i]}/`
   })
}

  return links;
};

export default useBreadcrumb;
