import { Link } from 'react-router-dom'
import PageNav from '../components/PageNav'
import AppNav from '../components/AppNav'

function HomePage() {
	return (
		<div>
			<PageNav />
			<AppNav />
			<h1 className="test">HOMEPAGE</h1>
			{/* <a href="/pricing">Pricing</a> */}
			{/* VERY IMPORTANT THIS CAUSES HARD REFRESH OF THE WEBPAGE REQUIRING RELOAD OF ALL RESOURCES */}
			<Link to="/app">Go to the app</Link>
		</div>
	)
}

export default HomePage
