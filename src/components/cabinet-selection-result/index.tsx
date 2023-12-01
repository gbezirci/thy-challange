import { Component, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import "./style.scss";
import { Panel } from "primereact/panel";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { dvd, flightTpyeCard, tw } from "../flight-list";
import { useNavigate } from "react-router-dom";

function CabinetSelectionResult() {
  const { origin, destination, passengerCount, selectedFlight } =
    useAppSelector((state) => state.flight);

    const nav = useNavigate();

  const [flight, setFlight] = useState<any>();
  const [item, setItem] = useState<any>();

  useEffect(() => {
    if (!origin || !destination || !passengerCount) {
      window.location.href = "/";
    }

    if (!selectedFlight) {
      window.location.href = "/list";
    }

    setFlight(selectedFlight.flight);
    setItem(selectedFlight.item);
  }, []);

  return (
    <>
      {flight && (
        <div className="page-area">
          <Panel
            className="res-panel"
            headerTemplate={resultHeader(selectedFlight.item.status)}
            footerTemplate={resultFooter(selectedFlight.item.status,nav)}
          >
            <div className="wrapper">
              <Card pt={tw}>
                <div className="flight-detail flex flex-row items-center">
                  <div className="flex flex-auto flex-row justify-between">
                    <div>
                      {flight.arrivalDateTimeDisplay} <br />
                      <span>{flight.originAirport.code}</span> <br />
                      <small>{flight.originAirport.city.name}</small>
                    </div>
                    <Divider pt={dvd} layout="horizontal">
                      <img
                        className="flight-type"
                        src="https://www.turkishairlines.com/theme/img/carrierairlines/carriercode_tk.png"
                        alt=""
                      />
                    </Divider>
                    <div className="text-right">
                      {flight.departureDateTimeDisplay} <br />
                      <span>{flight.destinationAirport.code}</span> <br />
                      <small>{flight.destinationAirport.city.name}</small>
                    </div>
                  </div>
                  <div className="flex flex-initial w-40 flex-col items-center">
                    <span className="text-xs">Uçuş Süresi</span>
                    <span className="text-2xl">{flight.flightDuration}</span>
                  </div>
                </div>
              </Card>
              <Card pt={flightTpyeResCard}>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-sm">Toplam Ücret</span>
                  <span className="text-sm">
                    Yolcu Sayısı: {passengerCount}
                  </span>
                  <span className="text-2xl">
                    {item.price.currency +
                      " " +
                      (item.price.amount * passengerCount).toFixed(0)}
                  </span>
                </div>
              </Card>
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}

export default CabinetSelectionResult;

export const flightTpyeResCard = {
  root: {
    className: classNames(
      "bg-sky-900 text-slate-700 rounded-none", // Background, text color, box shadow, and border radius.
      "dark:bg-gray-900 dark:text-white ",
      "shadow-list flex flex-row justify-center items-center relative"
    ),
  },
  body: {
    className: classNames("pl-3 pr-1 pt-5 pb-5"),
  },
  content: {
    className: classNames("pt-0 pb-0"),
  },
};

const resultHeader = (status: string) => {
  return (
    <>
      <div
        className={classNames("flex flex-row justify-start items-center p-2", {
          "bg-red-400": status === "ERROR",
          "bg-green-700": status === "AVAILABLE",
        })}
      >
        <span className="mr-2 text-slate-200" style={{ fontSize: "1.25rem" }}>
          Kabin seçiminiz{" "}
          {status === "ERROR"
            ? "başarısız oldu."
            : "başarılı bir şekilde tamamladı."}
        </span>
      </div>
    </>
  );
};

const resultFooter = (status: string,navigate) => {
  return (
    <>
      <div className="flex flex-row justify-end items-center bg-white py-2">
        {status === "ERROR" && (
          <Button
            label="Uçuş Listesine Dön"
            severity={"danger"}
            size="small"
            className=" text-slate-300 border-slate-300 font-medium focus:shadow-none"
            onClick={() => {
              navigate("/list");
            }}
          />
        )}
        <Button
          label="Başa Dön"
          severity={status === "ERROR" ? "danger" : "success"}
          size="small"
          className=" text-slate-300 border-slate-300 font-medium focus:shadow-none"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </>
  );
};
