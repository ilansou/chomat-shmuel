import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { db } from "../firebase";

const ExportComponent = ({ collectionName }) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, collectionName);
      try {
        const data = await getDocs(collectionRef);
        const formattedData = data.docs.map((doc) => doc.data());
        setDataList(formattedData);
      } catch (error) {
        console.error(`Error getting data from ${collectionName}: `, error);
      }
    };

    fetchData();
  }, [collectionName]);

  const handleExportToExcel = () => {
    // Convert dataList to Excel format
    const excelData = dataList.map((item) => {
      const formattedItem = {};
      Object.keys(item).forEach((key) => {
        formattedItem[key] = item[key];
      });
      return formattedItem;
    });

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Create Excel workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Export Data");

    // Generate Excel file and save it
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(excelBlob, `${collectionName}_export.xlsx`);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8 text-center">
      <button
        onClick={handleExportToExcel}
        className="bg-green-300 text-white rounded-lg p-2 max-w-full w-full shadow-md border border-gray-200 text-left mb-4 hover:bg-green-400 focus:bg-green-400"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default ExportComponent;
