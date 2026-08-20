import type { Metadata } from "next";
import { CheckoutReadiness } from "../../components/commerce/checkout-readiness";

export const metadata:Metadata={title:"Checkout Readiness | NFCPlate",description:"Review the NFCPlate checkout experience for standard NFC and QR products.",robots:{index:false,follow:false}};
export default function CheckoutPage(){return <CheckoutReadiness/>}
