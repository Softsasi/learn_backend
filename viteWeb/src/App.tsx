import Navbar from './components/Navbar';
import AppRoutes from './routes';

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <AppRoutes />
    </>
  );
};

export default App;
