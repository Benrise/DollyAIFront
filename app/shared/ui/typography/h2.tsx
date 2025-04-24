import React from 'react';

export const H2 = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={`text-[1.5rem] sm:text-3xl font-medium ${className}`}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

H2.displayName = 'h2';