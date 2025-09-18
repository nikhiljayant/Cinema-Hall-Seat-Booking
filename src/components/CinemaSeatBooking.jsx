const CinemaSeatBooking = ({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 5,
  },
  seatTypes = {
    regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
    premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
    vip: { name: "VIP", price: 350, rows: [6, 7] },
  },
  bookedSeats = [],
  currency = "₹",
  onBookingComplete = () => {},
  title = "Cinema Seat Booking",
  subTitle = "Select your seats",
}) => {
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
          {Array.from({ length: layout.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-[30px]">
              <span>{String.fromCharCode(rowIndex + 65)}</span>
              <div className="flex gap-[10px] items-center text-sm">
                {Array.from({ length: layout.seatsPerRow }).map(
                  (_, seatIndex) => (
                    <div
                      key={seatIndex}
                      className={`w-[35px] h-[35px] rounded-t-[12px] flex items-center justify-center ${
                        seatIndex === layout.aislePosition && "mr-[30px]"
                      } ${
                        seatTypes.regular.rows.includes(rowIndex) &&
                        "bg-blue-200 border border-blue-400"
                      } ${
                        seatTypes.premium.rows.includes(rowIndex) &&
                        "bg-violet-200 border border-violet-400"
                      } ${
                        seatTypes.vip.rows.includes(rowIndex) &&
                        "bg-yellow-100 border border-yellow-400"
                      }`}
                    >
                      {seatIndex + 1}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full p-[10px] bg-gray-50 rounded-md flex gap-[30px] items-center justify-center text-sm">
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
      </div>
    </div>
  );
};

export default CinemaSeatBooking;
