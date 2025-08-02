import { useState } from "react";

export const ItemSelectionTable = ({ items, onFormSubmit }: { items: { MODEL_NAME: string; MAT_CODE: string }[]; onFormSubmit: (message: string) => void }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log("Items in ItemSelectionTable: ", items);
  
  const selectItem = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setQuantity(0);
    } else {
      setSelectedIndex(index);
      setQuantity(1);
    }
  };

  const updateQuantity = (delta: number) => {
    setQuantity(prev => Math.max(0, prev + delta));
  };

  const handleSubmit = () => {
    if (selectedIndex !== null && quantity > 0 && !isSubmitted) {
      const selectedItem = items[selectedIndex];
      const message = `I would like to request ${quantity} unit(s) of ${selectedItem.MODEL_NAME} (Material Code: ${selectedItem.MAT_CODE})`;
      setIsSubmitted(true);
      onFormSubmit(message);
    }
  };

  return (
    <div>
      <table className="table table-zebra w-full">
      <thead>
        <tr className="bg-base-200 text-sm">
          <th>Select</th>
          <th>Model Name</th>
          <th>Material Code</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={item.MAT_CODE} className={selectedIndex === idx ? "bg-base-300" : ""}>
            <td>
              <input
                type="radio"
                name="item-selection"
                className="radio radio-primary"
                checked={selectedIndex === idx}
                onChange={() => selectItem(idx)}
              />
            </td>
            <td>{item.MODEL_NAME}</td>
            <td>{item.MAT_CODE}</td>
            <td>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(-1)}
                  className="btn btn-sm btn-outline"
                  disabled={selectedIndex !== idx}
                >
                  -
                </button>
                <span className="min-w-[2ch] text-center">
                  {selectedIndex === idx ? quantity : 0}
                </span>
                <button
                  onClick={() => updateQuantity(1)}
                  className="btn btn-sm btn-outline"
                  disabled={selectedIndex !== idx}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-4 flex justify-center">
      <button
        onClick={handleSubmit}
        className="btn btn-primary"
        disabled={selectedIndex === null || quantity === 0 || isSubmitted}
      >
        Submit
      </button>
    </div>
    </div>
  );
};
