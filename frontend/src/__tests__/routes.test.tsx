import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "../App"

describe("Routing", () => {
  test("redirects to login for protected routes when not authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/admin/songs"]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })
})
