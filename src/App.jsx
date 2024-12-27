import { Outlet, Route, Routes } from 'react-router';
import BaseLayout from './views/BaseLayout';
import Home from './views/Home';
import AvailableCats from './views/AvailableCats';
import AboutUs from './views/AboutUs';
import ContactUs from './views/ContactUs';

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout><Outlet /></BaseLayout>}>
        <Route path={'/'} element={<Home />} />
        <Route path={'/available-cats'} element={<AvailableCats />} />
        <Route path={'/about'} element={<AboutUs />} />
        <Route path={'/contact'} element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default App;
