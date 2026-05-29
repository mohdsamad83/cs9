import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"
import "react-toastify/dist/ReactToastify.css"

const router = createBrowserRouter(routes)

function App() {
	return <RouterProvider router={router} />
}

export default App
