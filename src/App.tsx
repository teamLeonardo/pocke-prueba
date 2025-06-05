import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import PageContainer from './components/layout/PageContainer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { routes } from './routes';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <PageContainer>
            <Suspense fallback={<LoadingSpinner />}>
              <AppRoutes />
            </Suspense>
          </PageContainer>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
