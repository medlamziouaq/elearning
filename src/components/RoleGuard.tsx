import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  allowed: ('admin' | 'formateur' | 'apprenant')[];
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowed, children }) => {
  const { account, role } = useWeb3();
  if (!account) return <Navigate to="/login" replace />;
  if (!role) return null;
  if (!allowed.includes(role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export default RoleGuard; 