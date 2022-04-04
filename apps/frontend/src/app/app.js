import React from 'react';
import Header from './components/Header';
const Feed = React.lazy(() => import('./views/Feeds'));
export function App() {
  return (
    <>
      <Header />
      <React.Suspense fallback={<h1>...loading</h1>}>
        <Feed />
      </React.Suspense>
    </>
  );
}
export default App;
