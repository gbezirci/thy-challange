import { Card } from "primereact/card";
import PanelTemplateHeader from "./panel-header";
import "./style.scss";
import { Panel } from "primereact/panel";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import flights from "../../mock/flights.json";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedFlight } from "../../store/flightSlice";
import { useNavigate } from "react-router-dom";

function FlightList() {
  const dispatch = useAppDispatch();
  const { origin, destination, passengerCount, order } = useAppSelector(
    (state) => state.flight
  );
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState<string>("");
  const [flightList, setFlightList] = useState<any[]>();

  const passangerCount = 1;
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!origin || !destination || !passengerCount) {
      window.location.href = "/";
    }

    sortBy();
  }, []);

  useEffect(() => {
    sortBy();
  }, [order]);

  const sortBy = () => {
    if (order == "ECONOMY") {
      setFlightList(
        flights.flights.sort((a, b) =>
          a.fareCategories.ECONOMY.subcategories[0].price.amount >
          b.fareCategories.ECONOMY.subcategories[0].price.amount
            ? 1
            : -1
        )
      );
    } 
     if (order == "DEPARTURE") {
      setFlightList(
        flights.flights.sort((a, b) => {
          // Saat ve dakikayı ayrıştır
          const [hoursA, minutesA] = a.arrivalDateTimeDisplay
            .split(":")
            .map(Number);
          const [hoursB, minutesB] = b.arrivalDateTimeDisplay
            .split(":")
            .map(Number);

          // Toplam dakikaya çevir
          const totalMinutesA = hoursA * 60 + minutesA;
          const totalMinutesB = hoursB * 60 + minutesB;

          // Dakika cinsinden karşılaştır
          return totalMinutesA - totalMinutesB;
        })
      );
    }
  };

  const selectedFlightHandler = (flight: any, item: any) => {
    dispatch(setSelectedFlight({ flight: flight, item: item }));

    navigate("/result");
  };

  return (
    <>
      <div className="page-header-area">
        <div className="desc mb-8">
          <div className="w-36 bg-red-500 text-white text-center py-1 mb-3">
            Uçuş
          </div>
          <span className="text-2xl mt-3">
            İstanbul - Antalya, {passangerCount} Yolcu
          </span>
        </div>

        <div className="promo">
          <div className="flex flex-row justify-startitems-center mb-4">
            <h3 className="mr-2">Promosyon Kodu</h3>
            <InputSwitch
              checked={checked}
              onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)}
            />
          </div>

          <h5>
            Promosyon kodu seçeneği ile tüm Economy kabini EcoFly paketlerini
            %50 indirimle satın alabilirsiniz!
          </h5>
          <h5>
            Promosyon kodu seçeneği aktifken EcoFly paketi haricinde seçim
            yapılamamaktadır.
          </h5>
        </div>
      </div>

      <div id="list-panel">
        <Panel
          headerTemplate={PanelTemplateHeader}
          toggleable
          className="panel-item"
        >
          {flightList &&
            flightList.map((flight, index) => (
              <div className="list-area">
                <div className="list-items">
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
                        <span className="text-2xl">
                          {flight.flightDuration}
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card
                    pt={flightTpyeCard}
                    onClick={() => {
                      setIngredient("Economy" + index);
                    }}
                  >
                    <div className="flex flex-auto flex-row justify-between items-center">
                      <div className="flex align-items-center mr-2">
                        <RadioButton
                          inputId={"economyclass" + index}
                          name={"economyclass" + index}
                          value={"Economy" + index}
                          onChange={(e: RadioButtonChangeEvent) =>
                            setIngredient(e.value)
                          }
                          checked={ingredient == "Economy" + index}
                        />
                        <label
                          htmlFor={"economyclass" + index}
                          className="ml-2 text-xs font-semibold"
                        >
                          ECONOMY
                        </label>
                      </div>

                      <div className="flex flex-auto flex-col items-center">
                        <span className="text-sm">Yolcu Başına</span>
                        <span className="text-2xl">
                          {flight.fareCategories.ECONOMY.subcategories[0].price
                            .currency +
                            " " +
                            flight.fareCategories.ECONOMY.subcategories[0].price.amount.toFixed(
                              0
                            )}
                        </span>
                      </div>
                    </div>
                    <div
                      className={classNames("bridge", {
                        hidden: ingredient !== "Economy" + index,
                      })}
                    ></div>
                  </Card>

                  <Card
                    pt={flightTpyeCard}
                    onClick={() => {
                      setIngredient("Business" + index);
                    }}
                  >
                    <div className="flex flex-auto flex-row justify-between items-center">
                      <div className="flex align-items-center mr-2">
                        <RadioButton
                          inputId={"businessclass" + index}
                          name={"businessclass" + index}
                          value={"Business" + index}
                          onChange={(e: RadioButtonChangeEvent) =>
                            setIngredient(e.value)
                          }
                          checked={ingredient == "Business" + index}
                        />
                        <label
                          htmlFor={"businessclass" + index}
                          className="ml-2 text-xs font-semibold"
                        >
                          BUSINESS
                        </label>
                      </div>

                      <div className="flex flex-auto flex-col items-center">
                        <span className="text-sm">Yolcu Başına</span>
                        <span className="text-2xl">
                          {flight.fareCategories.BUSINESS.subcategories[0].price
                            .currency +
                            " " +
                            flight.fareCategories.BUSINESS.subcategories[0].price.amount.toFixed(
                              0
                            )}
                        </span>
                      </div>
                    </div>

                    <div
                      className={classNames("bridge", {
                        hidden: ingredient !== "Business" + index,
                      })}
                    ></div>
                  </Card>
                </div>

                <div
                  className={classNames("fly-types", {
                    grid: ingredient.indexOf(index.toString()) != -1,
                    hidden: ingredient.indexOf(index.toString()) == -1,
                  })}
                >
                  {flight.fareCategories[
                    ingredient.indexOf("Business") != -1
                      ? "BUSINESS"
                      : "ECONOMY"
                  ].subcategories.map((item: any) => (
                    <div className="fare-sub-card">
                      <div className="sub-card-header">
                        <div className="flex flex-row justify-between">
                          <span className="brand-code">{item.brandCode}</span>
                          <span className="price">
                            <small>{item.price.currency}</small>
                            <span>{item.price.amount.toFixed(0)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="sub-card-content">
                        {item.rights.map((right: string) => (
                          <div className="right-item">{right}</div>
                        ))}
                      </div>
                      <div className="sub-card-footer">
                        <Button
                          pt={selectFlightTW}
                          label="Uçuşu seç"
                          disabled={checked && item.brandCode !== "ecoFly"}
                          onClick={() => {
                            selectedFlightHandler(flight, item);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </Panel>
      </div>
    </>
  );
}

export default FlightList;

const selectFlightTW = {
  root: ({ context }: { context: any }) => ({
    className: classNames(
      "w-full h-full bg-red-500 text-white text-center border-none rounded-none focus:shadow-none hover:bg-red-900",
      { "bg-slate-500 text-slate-600": context.disabled }
    ),
  }),
  label: ({ props }: { props: any }) => ({
    className: classNames("flex-1", "duration-200", "font-bold", {
      "hover:underline": props.link,
    }),
  }),
};

export const tw = {
  root: {
    className: classNames(
      "bg-sky-900 text-slate-700 rounded-none", // Background, text color, box shadow, and border radius.
      "dark:bg-gray-900 dark:text-white ",
      "shadow-list"
    ),
  },
  title: {
    className: classNames("text-2xl font-bold mb-0"),
  },
  content: {
    className: classNames("pt-0 pb-0"),
  },
};

export const flightTpyeCard = {
  root: {
    className: classNames(
      "bg-sky-900 text-slate-700 rounded-none", // Background, text color, box shadow, and border radius.
      "dark:bg-gray-900 dark:text-white ",
      "shadow-list flex flex-row justify-between items-center relative cursor-pointer"
    ),
  },
  body: {
    className: classNames("pl-3 pr-1 pt-5 pb-5"),
  },
  content: {
    className: classNames("pt-0 pb-0"),
  },
};

export const dvd = {
  root: ({ props }: { props: { layout: string; type: string } }) => ({
    className: classNames(
      "flex relative", // alignments.
      {
        "w-full my-5 mx-0 py-0 px-5 before:block before:left-0 before:absolute before:top-1/2 before:w-full before:border-t before:border-gray-300 before:dark:border-blue-900/40 items-center":
          props.layout == "horizontal", // Padding and borders for horizontal layout.
        "min-h-full mx-4 md:mx-5 py-5 before:block before:min-h-full before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2 before:border-l before:border-gray-300 before:dark:border-blue-900/40":
          props.layout == "vertical", // Padding and borders for vertical layout.
      },
      {
        "before:border-solid": props.type == "solid",
        "before:border-dotted": props.type == "dotted",
        "before:border-dashed": props.type == "dashed",
      } // Border type condition.
    ),
  }),
  content: () => ({
    className: classNames("px-0 bg-white z-10 dark:bg-gray-900", "pl-0 pr-0"),
  }),
};
