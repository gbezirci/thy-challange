import "./style.scss";
import {
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

import PortSelector from "../../widgets/port-selector";
import DatePicker from "../../widgets/date-picker";
import { Button } from "primereact/button";
import { PassengerSelector } from "../../widgets/passenger-selector";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function FlightInquiry() {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const { origin, destination, passengerCount } = useAppSelector(
    (state) => state.flight
  );

  const navigateListPageHandler = () => {
    if (!origin || !destination || !passengerCount) {
      return showToast("Lütfen tüm alanları doldurunuz.");
    }
   
    if (origin!=="IST" && destination!=="AYT") {
      return showToast("Sadece İstanbul'dan Antalya'ya uçuşlar mevcuttur.");
    }

    navigate("/list");
  };

  const showToast = (msg:string) => {
    toast.current?.show({
      severity: "error",
      summary: "Uyarı",
      detail: msg,
      life: 3000,
    });
  };

  return (
    <>
    <Toast ref={toast} />
      <div id="query-panel">
        <div className="flex flex-col justify-center items-center mt-40 mb-6">
          <h1 className="text-3xl">Merhaba</h1>
          <p>Nereyi keşfetmek istersiniz?</p>
        </div>

        <div id="query-fields">
          <div className=" mr-2">
            <PortSelector
              selectorType="from"
              icon={faPlaneDeparture}
              placeholder="Nereden"
              id="from-where"
            />
          </div>

          <div className=" mr-2">
            <PortSelector
              selectorType="to"
              icon={faPlaneArrival}
              placeholder="Nereye"
              id="to-where"
            />
          </div>

          <div className=" mr-2">
            <DatePicker />
          </div>

          <div className=" mr-2">
            <PassengerSelector />
          </div>

          <div className="mr-2">
            <div className="relative mt-2 rounded-md shadow-sm">
              <Button
                id="select-flight"
                severity="danger"
                icon="fa-light fa-chevron-right fa-2x"
                onClick={() => {
                  // navigate("/list");
                  navigateListPageHandler();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlightInquiry;
