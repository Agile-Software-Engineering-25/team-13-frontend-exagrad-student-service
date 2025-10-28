import Home from '@pages/Home/Home';
import { Route, Routes } from 'react-router';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default RoutingComponent;
