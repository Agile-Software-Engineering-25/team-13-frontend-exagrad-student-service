import Weather from '@pages/Weather/Weather';
import Home from '@pages/Home/Home';
import { Route, Routes } from 'react-router';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
};

export default RoutingComponent;
