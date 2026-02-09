import Link from 'next/link';
import {LogoProps}from'../types/navbar.types'


export const Logo = ({ isArabic, isDarkMode }: LogoProps) => {
  return (
    <Link href="/" className={`text-lg md:text-xl lg:text-2xl font-bold transition-colors hover:opacity-80 cursor-pointer ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {isArabic ? (
        <><span className={isDarkMode ? 'text-[#D4B87A]' : 'text-[#8B6914]'}>المتجر</span> العالمي</>
      ) : (
        <>Global <span className={isDarkMode ? 'text-[#D4B87A]' : 'text-[#8B6914]'}>Shop</span></>
      )}
    </Link>
  );
};
