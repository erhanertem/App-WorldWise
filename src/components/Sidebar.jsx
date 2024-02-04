import Logo from './Logo';
import AppNav from './AppNav';
import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';

function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			{/* <p>LIST OF CITIES</p> */}
			{/* Outlet acts like a children object inside app Route element. Depending on the nested route, Outlet provides the corresponding UI content. As such Outlet could be cities, countries or form depending on the sub route input @ URL */}
			<Outlet />

			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
				</p>
			</footer>
		</div>
	);
}

export default SideBar;
