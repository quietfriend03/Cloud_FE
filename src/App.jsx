import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AuthenticationPage } from './auth';
import { LandingAuthLayout } from './layout/auth-layout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<LandingAuthLayout />}>
            {/* Public routes */}
            {/* <Route index element={<LandingPage />} /> */}
            <Route path="auth" element={<AuthenticationPage />} />

            {/* Catch-all for unauthenticated 404 */}
            {/* <Route path="*" element={<Notfoundpage />} /> */}
        </Route>
    )
  );

  return (
    <RouterProvider router = {router}/>
  );
}

export default App;