import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import { BrowserRouter } from 'react-router-dom'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorComponent } from './components'

const router = createBrowserRouter([
	{
		path: '*',
		element: <App />,
		errorElement: <ErrorComponent />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
