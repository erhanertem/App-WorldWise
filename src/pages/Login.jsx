import PageNav from '../components/PageNav'
import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate, redirect } from 'react-router-dom'

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com')
	const [password, setPassword] = useState('qwerty')

	const { login, isAuthenticated } = useAuth() //Use login f from authContext api
	const navigate = useNavigate()

	function handleSubmit(event) {
		event.preventDefault()

		if (email && password) login(email, password)
	}

	useEffect(
		function () {
			if (isAuthenticated) {
				navigate('/app', { replace: true }) //VERY IMPORTANT!! navigate option of replace is important in order to be able tio go back to app landing page with browser back button
			}
		},
		[isAuthenticated, navigate],
	)

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	)
}
