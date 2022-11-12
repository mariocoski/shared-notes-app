import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider/authProvider';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function OnlyNonAuthenticatedRoute({ children, ...rest }: any) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/notes',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
