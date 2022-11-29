import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import InicioSesion from './routes/InicioSesion';
import Registro from './routes/Registro';
import ListaBotellas from './routes/ListaBotellas';
import RegistrarBotella from './routes/RegistrarBotella';
import DetalleBotella from './routes/DetalleBotella';
import Botellas from './routes/Botellas';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to='/registro' />
      },
      {
        path: '/inicioSesion',
        element: <InicioSesion />
      },
      {
        path: '/registro',
        element: <Registro />
      }
    ]
  },
  {
    path: '/botellas',
    element: <Botellas />,
    children: [
      {
        path: '/botellas',
        element: <ListaBotellas />,
        index: true
      },
      {
        path: '/botellas/registrar',
        element: <RegistrarBotella />
      },
      {
        path: "/botellas/:idBotella",
        element: <DetalleBotella/>
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
