// app/preview/page.tsx
import { Suspense } from "react";
import MoneyReceipt from "@/components/MoneyReceipt";

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading receipt...</div>}>
      <MoneyReceipt />
    </Suspense>
  );
}
