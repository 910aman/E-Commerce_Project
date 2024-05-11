import { Provider } from 'react-redux';
import ConfigureStores from './Redux/ConfigureStore';
import RouterPage from './Routers';

const App = () => {
  return (
    <div>
        <Provider store={ConfigureStores}>
          <RouterPage />
        </Provider>
    </div>
  )
}

export default App