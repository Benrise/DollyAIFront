import { Button, ButtonProps } from "@/app/shared/ui/button";
import { ReactNode } from "react";

interface MobileHeaderProps {
  title: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
  className?: string;
}

export const MobileHeader = ({
  title,
  leftComponent,
  rightComponent,
  leftButtonProps = {},
  rightButtonProps = {},
  className = "",
}: MobileHeaderProps) => {
  const defaultLeft = (
    <Button size="icon" variant="ghost" {...leftButtonProps}>
      {leftComponent}
    </Button>
  );

  const defaultRight = (
    <Button size="icon" variant="ghost" {...rightButtonProps}>
      {rightComponent}
    </Button>
  );

  return (
    <div className={`flex w-full justify-between items-center p-3 ${className}`}>
      {leftComponent ? (
        typeof leftComponent === "string" ? (
          defaultLeft
        ) : (
          leftComponent
        )
      ) : (
        defaultLeft
      )}

      <span className="text-base font-medium">{title}</span>

      {rightComponent ? (
        typeof rightComponent === "string" ? (
          defaultRight
        ) : (
          rightComponent
        )
      ) : (
        defaultRight
      )}
    </div>
  );
};