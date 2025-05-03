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
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Button variant={'ghost'} size="icon">
          <User/>
        </Button>
        <span>{user.email}</span>
      </div>
      <Button onClick={() => signOut()} variant={"link"} size="icon" className='text-foreground'>
        <LogOut size={18} />
      </Button>
    </div>
  );
};