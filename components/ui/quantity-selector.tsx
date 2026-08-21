"use client";

import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseLabel?: string;
  increaseLabel?: string;
};

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  decreaseLabel = "Decrease quantity",
  increaseLabel = "Increase quantity",
}: QuantitySelectorProps) {
  return (
    <div className="quantity-control">
      <button onClick={onDecrease} aria-label={decreaseLabel}>
        <Minus />
      </button>
      <span>{quantity}</span>
      <button onClick={onIncrease} aria-label={increaseLabel}>
        <Plus />
      </button>
    </div>
  );
}
