import { Skeleton } from 'antd';
import { LogOut, User } from 'lucide-react'

import { Button } from "@/app/shared/ui/button";
import { useAuthStore } from "@/app/entities/auth";
import { useUserStore } from '../model';

export const UserBadge = () => {
  const { signOut } = useAuthStore();
  const { user } = useUserStore();

  if (user === null) {
    return (
      <div className="flex justify-between items-center">
        <Skeleton title={{ width: "30%" }} paragraph={false} active />
        <Button onClick={() => signOut()} variant={"link"} size="icon" className='text-foreground'>
          <LogOut size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex items-center min-w-0">
        <Button variant={'ghost'} size="icon" className="flex-shrink-0">
          <User/>
        </Button>
        <span className="truncate min-w-0">
          {user.email}
        </span>
      </div>
      <Button 
        onClick={() => signOut()} 
        variant={"link"} 
        size="icon" 
        className='text-foreground flex-shrink-0'
      >
        <LogOut size={18} />
      </Button>
    </div>
  );
};