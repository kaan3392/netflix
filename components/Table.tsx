import { CheckIcon } from "@heroicons/react/24/solid";
import { Product } from "@stripe/firestore-stripe-payments";
import React from "react";

interface Props {
  products: Product[];
  selectedPlan: Product
}

export default function Table({ products, selectedPlan }: Props) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products.map((p) => (
            <td className={`tableDataFeature ${selectedPlan.id ===p.id ? "text-[#e50914]": "text-[gray]" }`} key={p.id}>
              TRY {p.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map((p) => (
            <td className={`tableDataFeature ${selectedPlan.id ===p.id ? "text-[#e50914]": "text-[gray]" }`} key={p.id}>
              {p.metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#E50914]'
                  : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#E50914]'
                  : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.portability === 'true' && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
