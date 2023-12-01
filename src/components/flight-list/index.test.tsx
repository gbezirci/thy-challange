import { render, screen } from "@testing-library/react";
import FlightList from "./index";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";

test("renders Promo", () => {
  render(
    <Provider store={store}>
      <MemoryRouter >
        <FlightList />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/Promosyon Kodu/i);
  expect(linkElement).toBeInTheDocument(); // Use toBeInTheDocument assertion
});
