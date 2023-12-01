import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useAppDispatch } from "../../../store/hooks";
import { setSortCriteria } from "../../../store/flightSlice";


const Tailwind = {
  label: () => ({
    className: classNames("flex-1", "duration-200", "font-medium"),
  }),
  
};

const PanelTemplateHeader = () => {

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex flex-row justify-end items-center bg-slate-500 py-2">
        <span className="mr-2 text-slate-200" style={{ fontSize: "1.25rem" }}>
          Sıralama Kriteri
        </span>
        <Button
          pt={Tailwind}
          label="Economi Ücreti"
          severity="secondary"
          outlined
          size="small"
          className="mr-2 text-slate-300 border-slate-300 font-medium focus:shadow-none"
          onClick={() => {
            
            dispatch(setSortCriteria("ECONOMY"));
          }}
        />
        <Button
          pt={Tailwind}
          label="Kalkış Saati"
          severity="secondary"
          outlined
          size="small"
          className="mr-2 text-slate-300 border-slate-300 focus:shadow-none"
          onClick={() => {
            
            dispatch(setSortCriteria("DEPARTURE"));
          }}
        />
      </div>
    </>
  );
};

export default PanelTemplateHeader;
