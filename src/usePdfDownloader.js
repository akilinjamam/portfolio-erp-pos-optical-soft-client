import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useGetbranchData from "./data/branchData/useGetBranchData";
import { jwtDecode } from "jwt-decode";

const usePdfDownloader = (tableData, header, title, summaryData, tableTopGap = 60, from = 'date', to = 'date') => {
  const { branchData } = useGetbranchData();
  const token = localStorage.getItem("user");
  const splitToken = token?.split(' ')?.[1];

  let findBranch = null;
  if (splitToken) {
    try {
      const branchId = jwtDecode(splitToken)?.branchId;
      findBranch = branchData?.result?.find(f => f?._id === branchId);
    } catch (error) {
      console.error("Token decoding failed", error);
    }
  }

  const handleDownloadPDF = (action = "download") => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // 🏪 Shop Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(findBranch?.name || "Shop Name", pageWidth / 2, 15, { align: "center" });

    let startY = 30;

    // 🧾 Dynamic Summary Grid
    if (summaryData && summaryData.length > 0) {
      doc.setFontSize(10);
      const col1X = 14;
      const col2X = 110;

      summaryData.forEach((item, index) => {
        const x = index % 2 === 0 ? col1X : col2X;
        const y = startY + Math.floor(index / 2) * 6;
        doc.text(`${item.label}: ${item.value}`, x, y);
      });

      startY += Math.ceil(summaryData.length / 2) * 6 + 5;
    }

    // 📅 Current Date
    const today = `${from} to ${to}`
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${today}`, pageWidth / 2, 22, { align: "center" });

    // Title
    doc.setFontSize(18);
    doc.text(title?.split('-')?.[0], 14, 15);

    // Generate table
    autoTable(doc, {
      head: [header],
      body: tableData,
      startY: tableTopGap,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: { fillColor: [66, 66, 66] },
      columnStyles: {
        0: { cellWidth: 10 },
        // Adjust these indices based on your corrected 8-column table
        7: { cellWidth: 35 },
      },
    });

    if (action === "print") {
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.src = url;

      document.body.appendChild(iframe);

      // We use a slight delay to ensure the PDF viewer inside the iframe is ready
      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          } catch (e) {
            console.error("Print failed:", e);
          }

          // Cleanup
          setTimeout(() => {
            URL.revokeObjectURL(url);
            document.body.removeChild(iframe);
          }, 2000); // Increased cleanup delay to ensure print dialog stays open
        }, 500); // 500ms delay gives the PDF viewer time to initialize
      };
    } else {
      // Standard Download
      doc.save(`${title}.pdf`);
    }
  };

  return { handleDownloadPDF };
};

export default usePdfDownloader;