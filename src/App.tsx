import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import PageContainer from './components/layout/PageContainer';

const App = () => {
  const element = useRoutes(routes);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <PageContainer>
        <Suspense fallback={<LoadingSpinner />}>
          {element}
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default App;
