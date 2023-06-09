const data={
    receiptNum:4321,
    buyerName:"Arya",
    buyerPhone:9876543210,
    description:"",
    billAmt:4320,
    convenienceFee:0,
    totalAmt:billAmt+convenienceFee
    }
    
    const getHtml = (data) => {
     return `
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td colspan="2"><img src="C:\Users\Lenovo\OneDrive\Desktop\invoice\logo.png" width="150"  /></td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td width="49%"><table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:15px;">Payment Receipt</td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Receipt Number: ${data.receiptNum}</td>
                </tr>
                <tr>
                  <td> </td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:15px;">Service Provider </td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">National Payment corporation of India (BBPS Dept.) </td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">National Payment corporation of India (BBPS Dept.)</td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">1001A, The Capital B Wing, 10th Floor, Bandra Kurla Complex, Bandra (E), Mumbai  </td>
                </tr>
                <tr>
                  <td> </td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">BBPS Biller Id: UGVCL0000GUJ01</td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">BBPS Transaction Id: PT01GYWT4625</td>
                </tr>
                <tr>
                  <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Payment Channel: androidapp 8.14.55</td>
                </tr>
                <tr>
                  <td> </td>
                </tr>
                </table></td>
            </tr>
          </table></td>
          <td width="51%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="right"><img src="C:\Users\Lenovo\OneDrive\Desktop\invoice\logo.png" alt="" width="150"  /></td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right"></td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;"  align="right"> </td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;"  align="right">Receipt Date : 01-12-2020</td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:15px;" align="right">Buyer</td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right">${data.buyerName}</td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right">${data.buyerPhone}</td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right">[email protected]</td>
            </tr>
          </table></td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td colspan="2"><table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-left:1px solid #333; border-right:1px solid #333;" width="34%" height="32" align="center">Description</td>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333;" width="26%" align="center">Bill Amount</td>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333;" width="25%" align="center">Convenience Fee  (Inclusive of 18% GST)</td>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333; border-right:1px solid #333;" width="15%" align="center">Total Amount</td>
            </tr>
            <tr>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-left:1px solid #333; border-right:1px solid #333;" height="32" align="center">Bill Payment for Uttar Gujarat Vij Company Limited  75203207160</td>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333;" align="center">${data.billAmt}</td>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333;" align="center">${data.convenienceFee}</td>
              <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333; border-right:1px solid #333;" align="center">${data.totalAmt}</td>
            </tr>
          </table></td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">Total Amount in Words: Three Thousand Seven Hundred Seventy Rupees Only</td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px;" colspan="2">Please Note:</td>
        </tr>
        <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">Dear Consumer, the bill payment will reflect in next 48 hours or in the next billing cycle, at your service provider’s end. Please  contact paytm customer support for any queries regarding this order.</td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px;" colspan="2">DECLARATION:</td>
        </tr>
        <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">This is not an invoice but only a confirmation of the receipt of the amount paid against for the service as described above.  Subject to terms and conditions mentioned at paytm.com</td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2" align="center">(This is computer generated receipt and does not require physical signature.)  <br />B-121 Sector 5, Noida, Uttar Pradesh 201301,<br />  Service tax registration number: AAACO4007ASD002<br />  Paytm Order ID :12252016430</td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
        <tr>
          <td colspan="2"> </td>
        </tr>
      </table>`
    }
    
    
    module.exports={getHtml}