import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import Homepage from './pages/Homepage.tsx';
import SavedCats from './pages/SavedCats.tsx';
import App from './app.tsx';
import './reset.css';
import './index.css';
import './styles/footer.css'
import './styles/header.css'
import './styles/factCard.css';
import './styles/breedCard.css';
import './styles/button.css';

const Wrapper = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: '/Homepage',
                    element: <Homepage />,
                },
                {
                    path: '/SavedCats',
                    element: <SavedCats />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<Wrapper />);
}
