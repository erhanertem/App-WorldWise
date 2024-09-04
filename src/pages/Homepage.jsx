import { Link } from 'react-router-dom';

import PageNav from '../components/PageNav';
import AppNav from '../components/AppNav';

function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1 className="test">WorldWise</h1>
      {/* NOTE: Using a tag element causes hard reload  when routing */}
      {/* <a href="/pricing">Pricing</a> */}
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
