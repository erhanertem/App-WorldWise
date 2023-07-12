import Sidebar from '../components/SideBar'
import User from '../components/User'
import Map from '../components/Map'
import styles from './AppLayout.module.css'
// import ProtectedRoute from './ProtectedRoute'

function AppLayout() {
	return (
		// An alternate location for using the protectedroute component is to wrap the entire applayout
		// <ProtectedRoute>
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
		// </ProtectedRoute>
	)
}

export default AppLayout
