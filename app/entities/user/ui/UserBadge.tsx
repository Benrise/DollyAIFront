import { Button, Skeleton } from 'antd';
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';

export const UserBadge = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
          <div className="flex justify-between items-center px-10">
            <Skeleton title={{ width: '30%' }} paragraph={false} active />
            <Button onClick={() => signOut()} type="link" className="text-black!" shape="circle">
              <LogOut size={18} />
            </Button>
          </div>
        );
      }
    
      if (!session?.user) {
        return (
          <div className="flex justify-between items-center px-10">
            <span>Not logged in</span>
            <Button onClick={() => signOut()} type="link" className="text-black!" shape="circle">
              <LogOut size={18} />
            </Button>
          </div>
        );
      }
    
      return (
        <div className="flex justify-between items-center px-10">
          <span>{session.user.email}</span>
          <Button onClick={() => signOut()} type="link" className="text-black!" shape="circle">
            <LogOut size={18} />
          </Button>
        </div>
      );
};