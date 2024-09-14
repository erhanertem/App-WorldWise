import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton() {
	const navigate = useNavigate();

	return (
		<Button
			type="back"
			onClick={(e) => {
				//IMPORTANT!! THIS BUTTON RESIDES INSIDE A FORM AND IN ORDER TO PREVENT RELOADING WE GOT TO USE PREVENTDEFAULT
				e.preventDefault();
				return navigate(-1);
			}}
		>
			&larr; Back
		</Button>
	);
}

export default BackButton;
