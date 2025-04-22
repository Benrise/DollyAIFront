import React from 'react';

export const Body = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`text-[1rem] leading-[150%] md:text-lg xl:text-xl font-medium ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Body.displayName = 'Body';