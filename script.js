document.getElementById("pdfForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload
  
    // Get input data
    const company = document.getElementById("company").value;
    const serviceAmount = document.getElementById("serviceAmount").value;
    const preTaxAmount = document.getElementById("preTaxAmount").value;
    const tax = document.getElementById("tax").value;
    const totalAmount = document.getElementById("totalAmount").value;
  
    // Load the PDF file
    const existingPdfBytes = await fetch("https://bader1009393.github.io/lsudhlhbfliurfr/updated_عرض_خدمات.pdf")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to load PDF file: ${res.statusText}`);
    }
    return res.arrayBuffer();
  })
  .catch((err) => {
    alert(`خطأ أثناء تحميل ملف PDF: ${err.message}`);
    throw err;
  });


  
    // Load PDF document
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();
  
    // Update fields in the PDF
    form.getTextField("اسم الشركة").setText(company);
    form.getTextField("مبلغ الخدمة").setText(serviceAmount);
    form.getTextField("المبلغ قبل الضريبة").setText(preTaxAmount);
    form.getTextField("الضريبة").setText(tax);
    form.getTextField("الإجمالي").setText(totalAmount);
  
    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
  
    // Trigger file download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "filled_form.pdf";
    link.click();
  });
  