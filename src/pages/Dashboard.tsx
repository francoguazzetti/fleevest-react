import React from 'react';
import AuthService from '../services/auth.service';
import InvestorDashboard from './InvestorDashboard';
import DriverDashboard from './DriverDashboard';

const Dashboard: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {currentUser.role === 'investor' ? (
        <InvestorDashboard />
      ) : (
        <DriverDashboard />
      )}
    </div>
  );
};

export default Dashboard;
