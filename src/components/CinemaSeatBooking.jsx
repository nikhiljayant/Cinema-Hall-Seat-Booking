import React from "react";

const CinemaSeatBooking = ({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 6,
  },
  seatTypes = {
    regular: { name: "Regular", price: 150, rows: ["A", "B", "C"] },
    premium: { name: "Premium", price: 250, rows: ["D", "E", "F"] },
    vip: { name: "VIP", price: 350, rows: ["G", "H"] },
  },
  bookedSeats = {
    A: [1, 2],
    B: [5, 6, 7],
    C: [],
    D: [3],
  },
  currency = "₹",
  onBookingComplete = () => {},
  title = "Cinema Seat Booking",
  subTitle = "Select your seats",
}) => {
  const [seats, setSeats] = React.useState({});
  const [currentlyBookedSeats, setCurrentlyBookedSeats] = React.useState({});

  // In order to create seat layout in a proper structure
  React.useEffect(() => {
    const seatObj = {};
    Array.from({ length: layout.rows || 0 }).forEach((_, rowIndex) => {
      Array.from({ length: layout.seatsPerRow || 0 }).forEach(
        (_, seatIndex) => {
          if (seatObj[String.fromCharCode(rowIndex + 65)]) {
            seatObj[String.fromCharCode(rowIndex + 65)]?.push(seatIndex + 1);
          } else {
            seatObj[String.fromCharCode(rowIndex + 65)] = [seatIndex + 1];
          }
        }
      );
    });

    setSeats(seatObj);
  }, []);

  const handleBookOrRemoveSeats = (row, seatNo) => {
    setCurrentlyBookedSeats((prev) => {
      const updatedSeats = { ...prev };

      if (updatedSeats[row]?.includes(seatNo)) {
        updatedSeats[row] = updatedSeats[row].filter((seat) => seat !== seatNo);
      } else {
        if (updatedSeats[row]?.length > 0) {
          updatedSeats[row] = [...updatedSeats[row], seatNo];
        } else {
          updatedSeats[row] = [seatNo];
        }
      }

      return updatedSeats;
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h1>
        <p className="text-center text-gray-600 mb-6">{subTitle}</p>

        {/* Screen */}
        <div className="mb-8">
          <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full mb-2 shadow-inner" />
          <p className="text-center text-sm text-gray-500 font-medium">
            SCREEN
          </p>
        </div>

        {/* Seats Layout */}
        <div className="mb-[30px] flex flex-col gap-[10px] items-center justify-center font-semibold">
          {Object.keys(seats).map((rowKey) => (
            <div key={rowKey} className="flex items-center gap-[30px]">
              <span>{rowKey}</span>
              <div className="flex gap-[10px] items-center text-sm">
                {Object.values(seats[rowKey]).map((seatNo) => (
                  <button
                    key={seatNo}
                    type="button"
                    className={`cursor-pointer w-[35px] h-[35px] rounded-t-[12px] flex items-center justify-center ${
                      seatNo === layout.aislePosition && "mr-[30px]"
                    }
                    disabled:bg-slate-300 disabled:border disabled:border-slate-600 disabled:cursor-not-allowed
                    ${
                      currentlyBookedSeats[rowKey]?.includes(seatNo)
                        ? "bg-green-300 border border-green-600"
                        : seatTypes.regular.rows.includes(rowKey)
                        ? "bg-blue-200 border border-blue-400"
                        : seatTypes.premium.rows.includes(rowKey)
                        ? "bg-violet-200 border border-violet-400"
                        : seatTypes.vip.rows.includes(rowKey)
                        ? "bg-yellow-100 border border-yellow-400"
                        : ""
                    }`}
                    disabled={bookedSeats[rowKey]?.includes(seatNo)}
                    onClick={() => handleBookOrRemoveSeats(rowKey, seatNo)}
                  >
                    {seatNo}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-[15px] w-full p-[10px] bg-gray-50 rounded-md flex gap-[30px] items-center justify-center text-sm">
          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-t-[12px] bg-blue-200 border border-blue-400" />
            <p>
              Regular ({currency}
              {seatTypes.regular.price})
            </p>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-t-[12px] bg-violet-200 border border-violet-400" />
            <p>
              Premium ({currency}
              {seatTypes.premium.price})
            </p>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-t-[12px] bg-yellow-100 border border-yellow-400" />
            <p>
              VIP ({currency}
              {seatTypes.vip.price})
            </p>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-t-[12px] bg-green-300 border border-green-600" />
            <p>Selected</p>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-t-[12px] bg-slate-300 border border-slate-600" />
            <p>Booked</p>
          </div>
        </div>

        <div className="mb-[15px] w-full py-[10px] px-[20px] bg-gray-50 rounded-md flex flex-col gap-[15px] font-semibold">
          <p className="text-lg">Booking Summary</p>
          {Object.keys(currentlyBookedSeats).length > 0 ? (
            <div className="flex flex-wrap gap-[15px]">
              {Object.keys(currentlyBookedSeats).map((row) =>
                Object.values(currentlyBookedSeats[row]).map((seatNo) => (
                  <p>
                    {row}
                    {seatNo}
                  </p>
                ))
              )}
            </div>
          ) : (
            <p className="text-md text-gray-600">No seats selected</p>
          )}
        </div>

        <button
          type="button"
          className="w-full py-[10px] text-center bg-gray-200 text-gray-600 rounded-md font-semibold text-[17px]"
        >
          Select seats to book
        </button>
      </div>
    </div>
  );
};

export default CinemaSeatBooking;
