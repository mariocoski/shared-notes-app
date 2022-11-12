import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginPage from '../shared/pages/LoginPage';
import { AuthenticatedRoute } from '../shared/pages/AuthenticatedRoute';
import RegisterPage from '../shared/pages/RegisterPage';
import { useAuth } from '../shared/providers/AuthProvider/authProvider';
import { NotesPage } from './Notes/page';
import { OnlyNonAuthenticatedRoute } from '../shared/pages/OnlyNonAuthenticatedRoute';
import { NotePage } from './Note/page';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const auth = useAuth();

  return (
    <StyledApp>
      <div>
        {auth.user ? (
          <button
            onClick={async () => {
              await auth.logout();
            }}
          >
            Logout
          </button>
        ) : null}

        {auth.user?.name ? <h3> Hello: {auth.user.name}!</h3> : null}

        <Switch>
          <OnlyNonAuthenticatedRoute path="/register">
            <RegisterPage />
          </OnlyNonAuthenticatedRoute>

          <OnlyNonAuthenticatedRoute path="/login">
            <LoginPage />
          </OnlyNonAuthenticatedRoute>

          <AuthenticatedRoute path="/note/:noteId" exact>
            <NotePage />
          </AuthenticatedRoute>

          <AuthenticatedRoute path="/notes" exact>
            <NotesPage />
          </AuthenticatedRoute>

          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
    </StyledApp>
  );
}

export default App;
