const Seat = ({
  rowKey,
  seatNo,
  aislePosition,
  currentlyBookedSeats,
  seatTypes,
  bookedSeats = {},
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      className={`cursor-pointer w-[35px] h-[35px] rounded-t-[12px] flex items-center justify-center ${
        seatNo === aislePosition && "mr-[30px]"
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
      onClick={onClick}
    >
      {seatNo}
    </button>
  );
};

export default Seat;
