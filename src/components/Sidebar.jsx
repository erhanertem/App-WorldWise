import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			{/* React Router Outlet element that displays the child routes @ the /app route */}
			<Outlet />

			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
				</p>
			</footer>
		</div>
	)
}

export default Sidebar
