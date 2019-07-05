import React from 'react';
import DashboardAppBar from './dashboard_app_bar';
import DashboardBody from './dashboard_body';
import './dashboard.scss';

const Dashboard = () => (
  <div>
    <DashboardAppBar />
    <DashboardBody />
  </div>
);

export default Dashboard;