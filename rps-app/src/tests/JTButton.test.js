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

test("Clicking on 'Join Tournament' button opens up join tournament Modal", () => {
  const app = render(
    <Router>
      <App />
    </Router>
  );
  userEvent.click(screen.getByRole("button", { name: "Join Tournament" }));
  screen.getByText("Choose a name and a colour!");
  screen.getByTestId("username-input-area");
  screen.getByText("Tournament ID");
});
