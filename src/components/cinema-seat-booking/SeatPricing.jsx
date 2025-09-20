const SeatPricing = ({ seatType = "", currency = "₹", price = 0 }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-[30px] h-[30px] rounded-t-[12px] bg-blue-200 border border-blue-400" />
      <p>
        {seatType} ({currency}
        {price})
      </p>
    </div>
  );
};

export default SeatPricing;
