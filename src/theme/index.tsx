import Tailwind from "primereact/passthrough/tailwind";
import { classNames } from "primereact/utils";

export const CustomizedTailwind = {
  ...Tailwind,
  radiobutton: {
    root: {
      className: classNames(
        "relative inline-flex cursor-pointer select-none align-bottom",
        "w-4 h-4"
      ),
    },
    input: ({ props }: { props: { checked: boolean; disabled: boolean } }) => ({
      className: classNames(
        "flex justify-center items-center",
        "border-2 w-4 h-4 text-gray-700 rounded-full transition duration-200 ease-in-out mt-1/2",
        {
          "border-gray-300  bg-white shadow-list dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80":
            !props.checked,
          "border-gray-400 bg-gray-400 dark:border-blue-400 dark:bg-blue-400":
            props.checked,
        },
        {
          "hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]":
            !props.disabled,
          "cursor-default opacity-60": props.disabled,
        }
      ),
    }),
    icon: ({ props }: { props: { checked: boolean; disabled: boolean } }) => ({
      className: classNames(
        "transform rounded-full",
        "block w-3 h-3 transition duration-200 bg-sky-900 dark:bg-gray-900",
        {
          "backface-hidden scale-10 invisible": !props.checked,
          "transform scale-100 visible": props.checked,
        }
      ),
    }),
  },

  inputnumber: {
    root: {
      className: classNames("w-full inline-flex"),
    },
    
    decrementbutton: () => ({
      className: classNames("order-1 flex !items-center !justify-center"),
    }),

    incrementbutton: () => ({
      className: classNames("order-3 flex !items-center !justify-center"),
    }),
  },
  
};
