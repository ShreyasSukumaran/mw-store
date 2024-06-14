import SpaceManSVG from './SpaceMan'
import './Error.css'

export function ErrorComponent() {
	return (
		<div>
			<main>
				<div className="container">
					<div className="row">
						<div className="col-md-6 align-self-center">
							<SpaceManSVG />
						</div>
						<div className="col-md-6 align-self-center">
							<h1>404</h1>
							<h2>UH OH! You&apos;re lost.</h2>
							<p>
								The page you are looking for does not exist. How you got here is
								a mystery. But you can click the button below to go back to the
								homepage.
							</p>
							<button
								className="btn green"
								onClick={() => (window.location.href = '/home')}
							>
								HOME
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
