import Sidebar from '@/components/Sidebar';
import React from 'react';
interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <main className="flex h-screen text-white">
      {/* Sidebar */}
      <div className="w-[25%] bg-primary px-4 py-6">
        <Sidebar />
      </div>
      <div className="w-[75%] bg-secondary px-4 py-6">{children}</div>
    </main>
  );
};

export default RootLayout;
