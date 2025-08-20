import { Route, Routes } from 'react-router';
import About from '../page/About';
import Home from '../page/Home';
import Login from '../page/Login';
import Post from '../page/Post';
import Registration from '../page/Registration';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
