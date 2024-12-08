import { RequireAuth } from './config/auth_context';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { LandingAuthLayout } from './layout/auth-layout';
import { AppLayout } from './layout/app-layout';
import { LandingPage } from './landing';
import { AuthenticationPage } from './auth';
import { DashboardPage } from './dashboard';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LandingAuthLayout />}>
        {/* Public routes */}
        <Route path="" element={<LandingPage />} />
        <Route path="auth" element={<AuthenticationPage />} />

        {/* Authenticated routes */}
        <Route element={<RequireAuth />}>
          <Route path="/user" element={<AppLayout />}>
            <Route path="" element={<DashboardPage />} />
          </Route>
        </Route>

        {/* Catch-all for unauthenticated 404 */}
        {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;