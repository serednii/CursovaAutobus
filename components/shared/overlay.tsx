import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Overlay: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('fixed inset-0 flex ', className)}>{children}</div>;
};