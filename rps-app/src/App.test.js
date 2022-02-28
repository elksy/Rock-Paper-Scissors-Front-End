import { render, screen, queryByAttribute } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("Page loads and shows title properly", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const title = screen.getByText(/Rock, Paper, Scissors/i);
  expect(title).toBeInTheDocument();
});

test("Landing page has buttons to play game and, join and create a tournament", () => {
  const app = render(
    <Router>
      <App />
    </Router>
  );
  screen.getByRole("button", { name: "Play Game" });
  screen.getByRole("button", { name: "Join Tournament" });
  screen.getByRole("button", { name: "Create Tournament" });
});

test("Clicking on 'Create Tournament' button opens up create tournament Modal", () => {
  const app = render(
    <Router>
      <App />
    </Router>
  );
  userEvent.click(screen.getByRole("button", { name: "Create Tournament" }));
  screen.getByRole("form");
  screen.getByText("Choose a name and a colour!");
  screen.getByTestId("username-input-area");

  const getByClass = queryByAttribute.bind(null, "class");
  getByClass(app.container, "colour-input");
});
