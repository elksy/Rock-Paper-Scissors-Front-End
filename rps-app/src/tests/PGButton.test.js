import {
  render,
  screen,
  queryByAttribute,
  within,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import App from "../App";

test("Clicking on 'Play Game' button opens up Play Game Modal", () => {
  const app = render(
    <Router>
      <App />
    </Router>
  );
  userEvent.click(screen.getByRole("button", { name: "Play Game" }));
  screen.getByText("Choose a name and a colour!");
  screen.getByTestId("username-input-area");
  const tournamentIDSection = screen.queryByText(/Tournament ID/i);
  expect(tournamentIDSection).not.toBeInTheDocument();
});
