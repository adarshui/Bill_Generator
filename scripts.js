document.addEventListener("DOMContentLoaded", () => {
    const billForm = document.getElementById("billForm");
    const addItemBtn = document.getElementById("addItem");
    const generateBillBtn = document.getElementById("generateBill");
    const downloadPdfBtn = document.getElementById("downloadPdf");
    const gstCheckbox = document.getElementById("gstCheckbox");
    const billOutput = document.getElementById("billOutput");
  
    let items = [];
  
    // Add item to the bill
    addItemBtn.addEventListener("click", () => {
      const itemName = document.getElementById("itemName").value;
      const itemAmount = parseFloat(document.getElementById("itemAmount").value);
      if (itemName && !isNaN(itemAmount) && itemAmount > 0) {
        items.push({ name: itemName, amount: itemAmount });
        document.getElementById("itemName").value = "";
        document.getElementById("itemAmount").value = "";
        alert("Item added successfully!");
      } else {
        alert("Please enter valid item details.");
      }
    });
  
    // Generate the bill
    generateBillBtn.addEventListener("click", () => {
      const buyerName = document.getElementById("buyerName").value;
      const phone = document.getElementById("phone").value;
      const includeGst = gstCheckbox.checked;
  
      if (!buyerName || !phone || items.length === 0) {
        alert("Please fill all details and add at least one item.");
        return;
      }
  
      let total = items.reduce((sum, item) => sum + item.amount, 0);
      let gstDetails = "";
  
      if (includeGst) {
        const gstAmount = total * 0.18;
        gstDetails = `
          <tr>
            <td colspan="2">SGST (9%)</td>
            <td>${(gstAmount / 2).toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2">CGST (9%)</td>
            <td>${(gstAmount / 2).toFixed(2)}</td>
          </tr>`;
        total += gstAmount;
      }
  
      billOutput.innerHTML = `
        <div class="bill-output">
          <h2>My Company</h2>
          <p>Address: 123 Business St, City, Country</p>
          <p>Contact: +1 234 567 890</p>
          ${includeGst ? `<p>GSTIN: 987456321</p>` : ""}
          <h3>Buyer Details</h3>
          <p>Name: ${buyerName}</p>
          <p>Phone: ${phone}</p>
          <h3>Bill Details</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) =>
                    `<tr><td>${item.name}</td><td>${item.amount.toFixed(2)}</td></tr>`
                )
                .join("")}
              ${gstDetails}
              <tr class="total">
                <td colspan="2">Total</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>`;
    });
  
    // Download bill as PDF
    downloadPdfBtn.addEventListener("click", () => {
      const doc = new jsPDF();
      doc.fromHTML(billOutput.innerHTML, 15, 15, { width: 170 });
      doc.save("bill.pdf");
    });
  });
  