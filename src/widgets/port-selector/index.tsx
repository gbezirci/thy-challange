import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import airports from "../../mock/ports.json";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDestination, setOrigin } from "../../store/flightSlice";

function PortSelector(props: {
  icon: IconDefinition;
  placeholder: string;
  id: string;
  selectorType: string;
}) {
  const dispatch = useAppDispatch();
  const {origin, destination} = useAppSelector((state) => state.flight);

  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    setItems(
      airports
        .filter(
          (item) =>
            (item.name + " " + item.province)
              .toLocaleLowerCase()
              .indexOf(event.query) !== -1
        )
        .map((item) => `${item.name} (${item.iata}), ${item.province}`)
    );
  };

  useEffect(() => {
    if (props.selectorType === "from") {
      setValue(
        airports.find((item) => item.iata === origin)?.name || ""
      );
    } else if (props.selectorType === "to") {
      setValue(
        airports.find((item) => item.iata === destination)?.name || ""
      );
    }
    else {
      throw new Error("Invalid selector type");
    }
  }
  , []);

 

  const selectPortHandler = (port: string) => {
    const selectedPort = airports.find(
      (item) => `${item.name} (${item.iata}), ${item.province}` === port
    );

    if (selectedPort) {
      if (props.selectorType === "from") {
        dispatch(setOrigin(selectedPort.iata));
      } else if (props.selectorType === "to") {
        dispatch(setDestination(selectedPort.iata));
      }
      else {
        throw new Error("Invalid selector type");
      }
    }
  };

  return (
    <>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute z-10 inset-y-0 left-0 flex items-center pl-3 mr-2">
          <span className="text-gray-500 sm:text-sm ">
            <FontAwesomeIcon icon={props.icon} />
          </span>
        </div>
        <AutoComplete
          id={props.id}
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => setValue(e.value)}
          onSelect={(e) => {
            selectPortHandler(e.value);
          }}
          placeholder={props.placeholder}
        />
      </div>
    </>
  );
}

export default PortSelector;
