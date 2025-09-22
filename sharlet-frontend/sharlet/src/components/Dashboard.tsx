import { jwtDecode } from 'jwt-decode';

import Transaction from './Transaction';
import Statistics from './Statistics';

type TokenPayload = {
  sub: string;
  name: string;
  exp: number;
};

const Dashboard = () => {
  
  const token = localStorage.getItem('token');
  if (!token) {
    return <div>Please log in to access the dashboard</div>;
  }
  const decodedToken = jwtDecode<TokenPayload>(token);
  const user = decodedToken.sub;
  console.log(user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-screen p-4">
      <div className='md:col-span-2'>
        <Transaction user={user} />
      </div>
      <Statistics />
    </div>
  );
}

export default Dashboard;