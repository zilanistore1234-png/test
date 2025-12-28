"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Barcode from "@/components/Barcode";

export default function MoneyReceipt() {
  const receiptRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const wfexpBase = searchParams.get("wfexpNo") || ""; // Dec20
  const agentName = searchParams.get("agentName") || "";
  const ain = searchParams.get("ain") || "";
 // With this:
const formatDate = (d: Date) => {
  const day = d.getDate().toString().padStart(2, "0");
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear().toString().slice(-2); // last 2 digits
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};

const date = formatDate(new Date());
  const userId = searchParams.get("userId") || "";
  const qty = Number(searchParams.get("qty") || 1);

  const cvcsAmount = 5;
  const fundAmount = 80;
  const totalAmount = cvcsAmount + fundAmount;

  // 🔹 barcode serial logic (Dec20 → Dec21 → Dec22)
 // 🔹 Preserve leading zeros
const match = wfexpBase.match(/^([A-Za-z]+)(\d+)$/);

const prefix = match?.[1] || "";
const startNumberStr = match?.[2] || "0";
const digitLength = startNumberStr.length;
const startNumber = parseInt(startNumberStr, 10);


  const handlePrint = () => {
    if (!receiptRef.current) return;
    const printContent = receiptRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        <div className="mb-4 flex justify-end gap-2">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Print Receipt
          </button>
        </div>

        <div ref={receiptRef}>
          {Array.from({ length: qty }).map((_, index) => {
            const wfexpNo = `${prefix}${String(startNumber + index).padStart(
  digitLength,
  "0"
)}`;


            return (
              <div
                key={wfexpNo}
                className="bg-white my-5 "
                style={{ pageBreakAfter: "always" }} // ← add this line
              >
                {/* Header with Date */}
                

                {/* Logo and Company Header */}
                <div className="border-1 border-black p-2 mx-12">
                  <div className="flex items-start gap-2 ">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src="/logo.jpg"
                        alt="BD Telecom Logo"
                        width={100}
                        height={75}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 text-center mt-1  mr-24">
                      <h1 className="text-[14px] font-bold mb-1 ">
                       Chattogram Customs Agents Association
                      </h1>
                      <p className="text-[12px] mb-1 whitespace-nowrap">
                       C & F Tower, (13th Floor) 1712 Seikh Mujib Road, Agrabad C/A, Chittagong
                      </p>
                      <p className="text-[10px] ">
                        Tel : 2513801-3, Fax : 2513804, Web : www.cnfctg.org, E-mail : cnfctg@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* WFEXP and Receipt Info */}
                  <div className="flex justify-between items-start ">
                    <div>
                      <div className="text-[12px]">
                        <span className="font-bold">WFEXP.</span> no: {wfexpNo}
                      </div>
                    </div>
                    <div className="border-1 border-black px-2 py-1 text-center">
                      <div className="font-bold text-[12px]">
                        MONEY RECEIPT
                      </div>
                      <div className="font-bold text-[12px]">
                        BD Telecom - DEPOT (EXPORT)
                      </div>
                    </div>
                    <div className=" flex flex-col gap-2 text-[8px] mr-10">
                      <div>Date: {date}</div>
                      <div>User ID: {userId}</div>
                    </div>
                  </div>

                  {/* Receipt Details */}
                <div className="mt-4 relative">
  {/* Watermark */}
  <Image
    src="/wtrmark.jpg"
    alt="Watermark"
    fill
   className="absolute inset-0 opacity-60 pointer-events-none object-contain z-0"
  />

  {/* Receipt Details Content */}
 <div className="relative z-10 ">
  {/* C&F Agent Name */}
  <div className="flex">
    <div className="w-48 text-[12px]">C&F Agent Name</div>
    <div className="flex-1 flex items-center">
      <span className="mr-1">:</span>
      <div className="border-b text-[12px] border-black w-full">{agentName}</div>
    </div>
  </div>

  {/* AIN */}
  <div className="flex">
    <div className="w-48 text-[12px]">AIN</div>
    <div className="flex-1 flex items-center">
      <span className="mr-1">:</span>
      <div className="border-b text-[12px] border-black w-full">{ain}</div>
    </div>
  </div>

  {/* Exporter Name */}
  <div className="flex">
    <div className="w-48 text-[12px]">Exporter Name</div>
    <div className="flex-1 flex ">
      <span className="mr-1">:</span>
      <div className="border-b text-[12px] border-black w-full"></div>
    </div>
  </div>

  {/* BIN */}
  <div className="flex">
    <div className="w-48 text-[12px]">BIN</div>
    <div className="flex-1 flex ">
      <span className="mr-1">:</span>
      <div className="border-b border-black w-full "></div>
    </div>
  </div>

  {/* Purpose */}
  <div className="flex">
    <div className="w-48 flex justify-start items-center text-[12px]">Purpose</div>
    <div className="flex-1 flex flex-col">
      <div className="flex items-center ">
       
        <div className=" w-full font-bold ml-3 text-[12px]">
          C&F Agents Welfare Fund : 40/-
        </div>
        
      </div>
       
      <div className="flex "> 
        :
        <div className="border-b ml-2 border-black w-full">
          <div className="flex justify-between">
<span className="font-bold  text-[12px]">
          Employee's Welfare Fund : 40/- CVCS <br /> Fund : 5.00/-
        </span>
        <span className="text-[12px]">Taka: {totalAmount.toFixed(2)}</span>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>

  {/* In Words */}
  <div className="flex">
    <div className="w-48 text-[12px]">In Words</div>
    <div className="flex-1 flex items-center">
      <span className="mr-1">:</span>
      <div className="border-b border-black w-full text-[12px]">Taka Eighty-five Only</div>
    </div>
  </div>
</div>

</div>

                  {/* Footer Note */}
                  <div className="mt-1 text-center text-[12px]">
                    This Money Receipt is computer generated and require no
                    signature.
                  </div>

                  {/* REAL BARCODE (NO DESIGN CHANGE) */}
                  <div className=" flex flex-col items-center">
                    <Barcode value={wfexpNo} />
                  </div>
                </div>
                <div>
                  <p className="text-[8px] ml-16 opacity-60 ">Powered By: Alchemy Software, +880-1313 406600, +880-1925 444999 Website: alchemy-bd.com</p>
                </div>

                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
