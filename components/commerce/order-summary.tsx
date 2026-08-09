"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, Tag } from "lucide-react";

export const FREE_SHIPPING_THRESHOLD=35;
export function OrderSummary({subtotal,showPromo=true}:{subtotal:number;showPromo?:boolean}) {
  const [code,setCode]=useState(""); const [applied,setApplied]=useState(false); const [message,setMessage]=useState("");
  useEffect(()=>{const timer=window.setTimeout(()=>{const saved=localStorage.getItem("biz365-promo");if(saved==="WELCOME10"){setCode(saved);setApplied(true)}},0);return()=>window.clearTimeout(timer)},[]);
  const discount=applied?subtotal*.1:0; const shipping=subtotal>=FREE_SHIPPING_THRESHOLD||subtotal===0?0:5.95; const total=Math.max(0,subtotal-discount+shipping); const remaining=Math.max(0,FREE_SHIPPING_THRESHOLD-subtotal);
  const apply=(e:FormEvent)=>{e.preventDefault();const normalized=code.trim().toUpperCase();if(normalized==="WELCOME10"){setCode(normalized);setApplied(true);setMessage("WELCOME10 applied — 10% demonstration discount");localStorage.setItem("biz365-promo",normalized)}else{setApplied(false);setMessage("That demonstration code is not valid");localStorage.removeItem("biz365-promo")}};
  return <aside className="order-summary" aria-label="Order summary"><h2>Order summary</h2><div className="shipping-progress"><div><span>{remaining?`Add $${remaining.toFixed(2)} for free U.S. shipping`:<><Check/> You qualify for free U.S. shipping</>}</span><strong>{Math.min(100,Math.round(subtotal/FREE_SHIPPING_THRESHOLD*100))}%</strong></div><i><b style={{width:`${Math.min(100,subtotal/FREE_SHIPPING_THRESHOLD*100)}%`}}/></i></div>{showPromo&&<form className="promo-form" onSubmit={apply}><label htmlFor="promo"><Tag/> Promotional code</label><div><input id="promo" value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter code"/><button>Apply</button></div>{message&&<p className={applied?"success":"error"} aria-live="polite">{message}</p>}<small>Try WELCOME10 for the temporary storefront demonstration.</small></form>}<dl><div><dt>Merchandise subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>{applied&&<div className="discount"><dt>Demonstration discount</dt><dd>−${discount.toFixed(2)}</dd></div>}<div><dt>Estimated shipping</dt><dd>{shipping?`$${shipping.toFixed(2)}`:"Free"}</dd></div><div><dt>Estimated tax</dt><dd>Calculated later</dd></div><div className="summary-total"><dt>Estimated total</dt><dd>${total.toFixed(2)} <small>USD</small></dd></div></dl><p className="summary-disclaimer">Final shipping and tax will be confirmed when live checkout is connected.</p></aside>;
}
