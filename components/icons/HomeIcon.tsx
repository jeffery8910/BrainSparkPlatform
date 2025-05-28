
import React from 'react';
import { IconProps } from '../../types';

const HomeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M6.75 21V12.75A1.5 1.5 0 018.25 11.25h7.5A1.5 1.5 0 0117.25 12.75V21M3 12l9-9 9 9" />
  </svg>
);
export default HomeIcon;
