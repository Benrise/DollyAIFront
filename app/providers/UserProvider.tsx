"use client"

import React, { useEffect, useState, createContext, useContext } from 'react';
import { IUserResponse, useUserStore } from '@/app/entities/user';
import { PricingDrawer } from '@/app/features/pricing';
import { useAuthStore } from '@/app/entities/auth';

const UserContext = createContext<{
  user: IUserResponse | null;
  isDrawerOpen: boolean;
  disableDrawerWatching: () => Promise<void>;
  openPricingDrawer: () => void;
  closePricingDrawer: () => void;
} | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, me } = useUserStore();
  const { session } = useAuthStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDrawerWatching, setIsDrawerWatching] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      me();
    }
  }, [session, me]);

  useEffect(() => {
    if (user && user.generations_left === 0 && isDrawerWatching) {
      setIsDrawerOpen(true);
    }
  }, [user]);

  const openPricingDrawer = () => setIsDrawerOpen(true);
  const closePricingDrawer = () => setIsDrawerOpen(false);
  const disableDrawerWatching = async () => setIsDrawerWatching(false);

  return (
    <UserContext.Provider value={{ disableDrawerWatching, user, isDrawerOpen, openPricingDrawer, closePricingDrawer }}>
      {children}
      <PricingDrawer open={isDrawerOpen} onClose={closePricingDrawer} />
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};