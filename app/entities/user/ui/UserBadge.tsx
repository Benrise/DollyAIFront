import { Button, Skeleton } from 'antd';
import { LogOut } from 'lucide-react'
import { useAuthStore } from "@/app/entities/auth";
import { useUserStore } from '../model';

export const UserBadge = () => {
  const { signOut } = useAuthStore();
  const { user } = useUserStore();

  if (user === null) {
    return (
      <div className="flex justify-between items-center px-10">
        <Skeleton title={{ width: "30%" }} paragraph={false} active />
        <Button onClick={signOut} type="link" className="text-black!" shape="circle">
          <LogOut size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-10">
      <span>{user.email}</span>
      <Button onClick={signOut} type="link" className="text-black!" shape="circle">
        <LogOut size={18} />
      </Button>
    </div>
  );
};