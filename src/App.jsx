import { Provider } from 'react-redux';
import ConfigureStores from './Redux/ConfigureStore';
import RouterPage from './Routers';
import { Auth0Provider } from '@auth0/auth0-react';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <div>
      <Provider store={ConfigureStores}>
        {/* <GoogleOAuthProvider clientId="493003783561-7qkamq0hng3f95833f7qlmicqifgi0tb.apps.googleusercontent.com"> */}
        <Auth0Provider
           domain="dev-p6ykzabd717mobzn.us.auth0.com"
           clientId="nzcwP0AchdCql7QyZ6bDI4GY0C6Sy3S0"
           authorizationParams={{
             redirect_uri: window.location.origin
           }}>
          <RouterPage />
        </Auth0Provider>
        {/* </GoogleOAuthProvider> */}
      </Provider>
    </div>
  )
}

export default App

// clientID: "493003783561-7qkamq0hng3f95833f7qlmicqifgi0tb.apps.googleusercontent.com"
// clientSecret: "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"