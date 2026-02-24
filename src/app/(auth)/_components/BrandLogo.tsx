import React from 'react';

import Logo from '@/components/common/Logo';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  /** tailwind classes applied to the logo svg */
  logoClassName?: string;
  /** extra classes applied to the wrapper div */
  className?: string;
  /** additional class for title text */
  titleClassName?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  logoClassName = 'w-12',
  className = '',
  titleClassName = '',
}) => {
  return (
    <div className={cn('mb-4 flex items-center justify-center space-x-1.5', className)}>
      <Logo className={logoClassName} />
      <h1 className={cn('font-montserrat text-2xl font-bold', titleClassName)}>SmartAssess</h1>
    </div>
  );
};

export default BrandLogo;
