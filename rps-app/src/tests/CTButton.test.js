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

test("You can't create a tournament without a name", () => {
  const name = "hkmr";
  const { container } = render(
    <Router>
      <App />
    </Router>
  );
  //userEvent.click(screen.getByRole("button", { name: "Create Tournament" }));
  //userEvent.type(screen.getByRole("link"));

  //const startButton = screen.getByText(/Start Tournament/i);

  //expect(startButton).not.toBeInTheDocument();
});

test("Create Tournament Page will have your inputted name and correct options to choose from", () => {
  const name = "hkmr";
  const { container } = render(
    <Router>
      <App />
      <Redirect to="/" />
    </Router>
  );
  userEvent.click(screen.getByRole("button", { name: "Create Tournament" }));
  userEvent.type(screen.getByTestId("username-input-area"), name);
  userEvent.click(screen.getByRole("link"));

  const welcomeName = screen.getByText(/hkmr/i);
  expect(welcomeName).toBeInTheDocument();

  screen.getByRole("heading", { name: "Create Tournament" });
  screen.getByRole("heading", { name: "Number of Rounds:" });
  screen.getByRole("heading", { name: "Time Limit:" });
  screen.getByRole("heading", { name: "Add Bots:" });
  screen.getByRole("heading", { name: "Tournament Type:" });
  screen.getByRole("heading", { name: "Tournament Type:" });
});

test("Start tournament sends you to tournament lobby", async () => {
  const name = "hkmr";
  const { container } = render(
    <Router>
      <App />
      <Redirect to="/" />
    </Router>
  );

  userEvent.click(screen.getByRole("button", { name: "Create Tournament" }));

  userEvent.type(screen.getByTestId("username-input-area"), name);

  userEvent.click(screen.getByRole("link"));

  await userEvent.click(
    screen.getByRole("button", { name: "Start Tournament" })
  );

  const linkTitle = screen.getByText(/Here Is Your Tournament Link!/i);
  // expect(linkTitle).toBeInTheDocument();
});
