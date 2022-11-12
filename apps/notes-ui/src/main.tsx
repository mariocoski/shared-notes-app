import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { AuthProvider } from './shared/providers/AuthProvider/authProvider';

ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
