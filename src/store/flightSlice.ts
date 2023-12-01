import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FlightState {
  origin: string;
  destination: string;
  passengerCount: number;
  isPromo: boolean;
  selectedFlight:any;
  order:string;
}

const initialState: FlightState = {
  origin: "",
  destination: "",
  passengerCount: 0,
  isPromo: false,
  selectedFlight: undefined,
  order: "ECONOMY",
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<string>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setPassengerCount: (state, action: PayloadAction<number>) => {
      state.passengerCount = action.payload;
    },
    setIsPromo: (state, action: PayloadAction<boolean>) => {
      state.isPromo = action.payload;
    },
    setSelectedFlight: (state, action: PayloadAction<any>) => {
      state.selectedFlight = action.payload;
    },
    setSortCriteria: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    }
  },
});

export const { setOrigin, setDestination, setPassengerCount, setIsPromo, setSelectedFlight, setSortCriteria} =
  flightSlice.actions;

export default flightSlice.reducer;
