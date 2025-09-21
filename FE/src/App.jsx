import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvide";
import { AppLayout } from "./layout/AppLayout";
import { ErrorPage } from "./pages/ErrorPage";


import { ToastContainer } from "react-toastify";
import { Main } from "./pages/Main";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Dashboard } from "./component/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <>
      <Provider store={store}>
        
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            bodyClassName="toastBody"
          />
        </AuthProvider>
      </Provider>
    </>
  );
};
