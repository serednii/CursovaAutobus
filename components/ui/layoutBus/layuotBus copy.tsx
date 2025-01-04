import DriverSeat from "./driverSeat";
import PassengerSeat from "./passengerSeat";
import Stairs from "./stairs";

export default function LayoutBus() {
  return (
    <div className="">
      <div className="relative w-[1000px] h-[230px] rounded-l-[50px] rounded-r-[25px] bg-[#6a89b8]  border-2 border-[#000000]">
        <DriverSeat className="left-[80px] bottom-[20px] rotate-[-90deg]" />
        <Stairs className="right-[100px] top-[0px]" />
        <Stairs className="left-[50px] top-[0px]" />

        <PassengerSeat className="left-[150px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[220px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[290px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[360px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[430px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[500px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[570px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[640px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[710px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[780px] bottom-[5px]" number={1} />
        <PassengerSeat className="left-[850px] bottom-[5px]" number={1} />

        <PassengerSeat className="left-[150px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[220px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[360px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[430px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[290px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[500px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[570px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[640px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[710px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[780px] bottom-[48px]" number={2} />
        <PassengerSeat className="left-[850px] bottom-[48px]" number={2} />

        <PassengerSeat className="left-[150px] top-[5px]" number={3} />
        <PassengerSeat className="left-[220px] top-[5px]" number={3} />
        <PassengerSeat className="left-[290px] top-[5px]" number={3} />
        <PassengerSeat className="left-[360px] top-[5px]" number={3} />
        <PassengerSeat className="left-[430px] top-[5px]" number={3} />
        <PassengerSeat className="left-[500px] top-[5px]" number={3} />
        <PassengerSeat className="left-[570px] top-[5px]" number={3} />
        <PassengerSeat className="left-[640px] top-[5px]" number={3} />
        <PassengerSeat className="left-[710px] top-[5px]" number={3} />
        <PassengerSeat className="left-[780px] top-[5px]" number={3} />

        <PassengerSeat className="left-[150px] top-[48px]" number={4} />
        <PassengerSeat className="left-[220px] top-[48px]" number={4} />
        <PassengerSeat className="left-[290px] top-[48px]" number={4} />
        <PassengerSeat className="left-[360px] top-[48px]" number={4} />
        <PassengerSeat className="left-[430px] top-[48px]" number={4} />
        <PassengerSeat className="left-[500px] top-[48px]" number={4} />
        <PassengerSeat className="left-[570px] top-[48px]" number={4} />
        <PassengerSeat className="left-[640px] top-[48px]" number={4} />
        <PassengerSeat className="left-[710px] top-[48px]" number={4} />
        <PassengerSeat className="left-[780px] top-[48px]" number={4} />

        <PassengerSeat className="right-[5px] top-[5px]" number={5} />
        <PassengerSeat className="right-[5px] top-[48px]" number={5} />
        <PassengerSeat className="right-[5px] top-[92px]" number={5} />
        <PassengerSeat className="right-[5px] top-[135px]" number={5} />
        <PassengerSeat className="right-[5px] top-[178px]" number={5} />
      </div>
    </div>
  );
}
