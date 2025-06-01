import { RouterProvider } from "react-router";
import router from './router/router';
import { Provider } from 'react-redux';
import store from "./utils/store/store";

function App() {

  return (
    <>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
    </>
  );
}

export default App;
