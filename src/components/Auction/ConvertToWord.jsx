export function convertAmountToWords(amount) {
    const rupeeWords = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"
    ];
  
    const tensWords = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
  
    const crore = Math.floor(amount / 10000000);
    const lakh = Math.floor((amount % 10000000) / 100000);
    const thousand = Math.floor((amount % 100000) / 1000);
    const rest = Math.floor(amount % 1000);
  
    const croreWords = crore > 0 ? `${rupeeWords[crore]} Crore ` : "";
    const lakhWords = lakh > 0 ? `${tensWords[lakh]} ${lakh === 1 ? "Lakh" : "Lakhs"} ` : "";
    const thousandWords = thousand > 0 ? `${rupeeWords[thousand]} Thousand ` : "";
    const restWords = rest > 0 ? `${rupeeWords[rest]} ` : "";
  
    return `${croreWords}${lakhWords}${thousandWords}${restWords}Rupees Only`;
  }
  