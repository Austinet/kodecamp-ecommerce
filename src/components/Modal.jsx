import { useContext, useEffect } from "react";
import { MainContext } from "../App";
import checkmark from "../assets/images/checkmark.png";

const Modal = () => {
  const { dispatch, modalMessage } = useContext(MainContext);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "TOGGLE_MODAL" });
    }, 2000);
  }, [modalMessage, dispatch]);

  return (
    <div className="absolute top-0 w-full min-h-[300px] grid place-content-center">
      <div className="bg-white w-11/12 md:w-[280px] p-5 text-center shadow-xl rounded-lg border-2 border-blue-600">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-lg font-semibold">{modalMessage}</p>
          <img src={checkmark} alt="Green Checkmark" className="Checkmark" />
        </div>
        {/* <div className="">
          <p></p>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
