import SpaceManSVG from './SpaceMan'
import './Error.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export function ErrorComponent() {
	useEffect(() => {
		const navElements = document.getElementsByClassName('navigation-container')
		for (let i = 0; i < navElements.length; i++) {
			navElements[i].classList.add('display-none')
		}

		return () => {
			for (let i = 0; i < navElements.length; i++) {
				navElements[i].classList.remove('display-none')
			}
		}
	}, [])

	return (
		<div className="body error">
			<div className="flex-container">
				<div className="spaceman">
					<SpaceManSVG />
				</div>
				<div className="lost-text">
					<h1>404</h1>
					<h2>UH OH! You&apos;re lost.</h2>
					<p>
						The page you are looking for does not exist. How you got here is a
						mystery. But you can click the button below to go back to the
						homepage.
					</p>
					<Link to="/home">
						<button className="error-btn green">HOME</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
