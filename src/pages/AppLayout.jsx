import styles from './AppLayout.module.css';

import SideBar from '../components/Sidebar';
import Map from '../components/Map';

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
