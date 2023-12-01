import { Button } from "primereact/button";
import {
  InputNumber
} from "primereact/inputnumber";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPassengerCount } from "../../store/flightSlice";

export const PassengerSelector = () => {
  const dispatch = useAppDispatch();
  const passengerCount = useAppSelector((state) => state.flight.passengerCount);

  const cabinetBoxRef = useRef<HTMLDivElement | null>(null);
  const [ingredient, setIngredient] = useState<string>("Economy");
  const [value, setValue] = useState<Nullable<number | null>>(0);
  const [isShowPassengerDetail, setIsShowPassengerDetail] =
    useState<boolean>(true);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        cabinetBoxRef.current &&
        !cabinetBoxRef.current.contains(event.target)
      ) {
        setIsShowPassengerDetail(true); // Eğer dışarıya tıklanırsa, kutuyu kapat
      }
    };

    // Dokümana tıklama olay dinleyicisini ekle
    document.addEventListener("mousedown", handleClickOutside);

    // Temizleme fonksiyonu
    return () => {
      // Komponent yok edilirken, olay dinleyicisini kaldır
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const iconHandler = (): string => {
    const res = "fa-solid fa-2x";

    if (passengerCount >= 0 && passengerCount < 2) {
      return res + " fa-person";
    } else if (passengerCount >= 2 && passengerCount < 3) {
      return res + " fa-people-pants-simple";
    } else if (passengerCount >= 3) {
      return res + " fa-people-group";
    }
    return res;
  };

  return (
    <>
      <div className="relative mt-2 rounded-md shadow-sm">
        <Button
          id="person-count"
          type="button"
          icon={iconHandler()}
          outlined
          badgeClassName="p-badge-danger"
          onClick={() => setIsShowPassengerDetail(!isShowPassengerDetail)}
        />
        <span className="absolute top-0 right-1 p-badge p-badge-danger p-badge-rounded p-mr-1 p-mt-1">
          {passengerCount}
        </span>
      </div>

      <div
        ref={cabinetBoxRef}
        className={classNames("cabinet-person-box none", {
          hidden: isShowPassengerDetail,
        })}
      >
        <div className="arrow_box">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-xs">Kabin ve yolcu seçimi</p>
              <div className="class-type-selection flex justify-center my-5">
                <div className="flex flex-wrap gap-3">
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="economyclass"
                      name="economyclass"
                      value="Economy"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setIngredient(e.value)
                      }
                      checked={ingredient === "Economy"}
                    />
                    <label
                      htmlFor="economyclass"
                      className="ml-2 text-xs font-semibold"
                    >
                      Economy Class
                    </label>
                  </div>
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="businessclass"
                      name="businessclass"
                      value="Business"
                      onChange={(e: RadioButtonChangeEvent) =>
                        setIngredient(e.value)
                      }
                      checked={ingredient === "Business"}
                    />
                    <label
                      htmlFor="businessclass"
                      className="ml-2 text-xs font-semibold"
                    >
                      Business Class
                    </label>
                  </div>
                </div>
              </div>
              <div className="passenger-counter flex justify-center w-full ">
                <div className="flex flex-row justify-between w-full items-center">
                  <label
                    htmlFor="horizontal-buttons"
                    className="font-bold block"
                  >
                    Yolcu
                  </label>
                  <InputNumber
                    inputId="horizontal-buttons"
                    value={value}
                    onValueChange={(e: any) =>
                      dispatch(setPassengerCount(parseInt(e.value)))
                    }
                    step={1}
                    showButtons
                    buttonLayout="horizontal"
                    decrementButtonClassName="dec-btn"
                    incrementButtonClassName="inc-btn"
                    incrementButtonIcon="fa-duotone fa-square-plus fa-2x"
                    decrementButtonIcon="fa-duotone fa-square-minus fa-2x"
                    inputClassName="passenger-counter-input text-center focus:shadow-none"
                    className="passenger-counter-input-container"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
