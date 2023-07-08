import Button from './Button'
import { useNavigate } from 'react-router-dom'

function BackButton() {
	const navigate = useNavigate()

	return (
		<Button
			type="back"
			onClick={event => {
				event.preventDefault() // We are inside the form so in order to avoid flash and submission of the form
				navigate(-1) // Go back one stepo back in the browser history means -1
			}}
		>
			&larr; Back
		</Button>
	)
}

export default BackButton
