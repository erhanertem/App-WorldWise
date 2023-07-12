import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'
import { useEffect } from 'react'

function ProtectedRoute({ children }) {
	// Check if the user is authenticated before displaying the children page
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()

	useEffect(
		function () {
			if (!isAuthenticated) navigate('/')
		},
		[isAuthenticated, navigate],
	)

	return isAuthenticated ? children : null
}

export default ProtectedRoute
