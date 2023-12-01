import { createBrowserRouter } from "react-router-dom";
import FlightInquiry from "../components/flight-inquiry";
import FlightList from "../components/flight-list";
import CabinetSelectionResult from "../components/cabinet-selection-result";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <FlightInquiry />,
  },
  {
    path: '/list',
    element: <FlightList />,
  },
  {
    path: '/result',
    element: <CabinetSelectionResult />,
  }
]);