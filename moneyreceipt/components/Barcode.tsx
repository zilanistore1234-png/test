// "use client";

// import { useEffect, useRef } from "react";
// import JsBarcode from "jsbarcode";

// interface BarcodeProps {
//   value: string;
// }

// export default function Barcode({ value }: BarcodeProps) {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     if (svgRef.current && value) {
//       JsBarcode(svgRef.current, value, {
//         format: "CODE39",
//         width: 0.8,
//         height: 50,
//         displayValue: false, // ❌ hide default text
//         margin: 0,
//       });
//     }
//   }, [value]);

//   return (
//     <div className="flex flex-col items-center">
//       {/* REAL barcode */}
//       <svg ref={svgRef} className=""></svg>

//       {/* Pixel Sans text BELOW barcode */}
//       <span
//         className="text-[11px] tracking-widest"
//         style={{ fontFamily: "PixelSans" }}
//       >
//         {value}
//       </span>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
}

export default function Barcode({ value }: BarcodeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      JsBarcode(svgRef.current, value, {
        format: "CODE39",
        width: 1.05,      // controls bar thickness
        height: 50,      // ✅ EXACT height
        displayValue: false,
        margin: 0,
      });
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center ml-[15px] ">
      {/* Force exact size */}
      <svg
        ref={svgRef}
        width="160"
        
        
      />

      {/* Barcode text */}
      <span
        className="text-[11px] tracking-widest mt-[-2px]"
        style={{ fontFamily: "PixelSans" }}
      >
        {value}
      </span>
    </div>
  );
}
