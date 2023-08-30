import {
  AutoGraph,
  CurrencyRupee,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { tableData } from "./state";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useRecoilState(tableData);

  const columns = [
    { field: "transaction_date", headerName: "Transaction Date", width: 140 },
    { field: "invoice_no", headerName: "Invoice No.", width: 140 },
    { field: "payer", headerName: "Payer", width: 180 },
    {
      field: "payee",
      headerName: "Payee",
      type: "number",
      width: 180,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 140,
    },
    {
      field: "amount",
      headerName: "USD Equivalent",
      width: 140,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const status = params.value;
        const numBars =
          status === "initiated"
            ? 1
            : status === "processing"
            ? 2
            : status === "completed"
            ? 3
            : 0;
        return (
          <div className="flex">
            {Array.from({ length: numBars }).map((_, index) => (
              <div
                key={index}
                className="w-10 h-2 mr-5 bg-blue-200 rounded-full"
              />
            ))}
          </div>
        );
      },
    },
  ];

  const url = "https://mocki.io/v1/74f6ba59-2aa8-4035-8f48-7d01d6dee4f5";
  const getData = () => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setRowData(data);
      })
      .catch(() => {
        setLoading(false);
        alert("Something Went Wrong!");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen min-h-screen space-y-10">
      <div className="flex items-center w-full justify-evenly">
        <div className="w-[28%] h-[25vh] flex items-center justify-center bg-[#1a1a1a80] border border-gray-700 rounded-xl">
          <div className="p-3 bg-[#ffa20089] rounded-lg">
            <CurrencyRupee />
          </div>
          <div className="flex flex-col px-5 py-2">
            <div className="flex items-center space-x-2">
              <span className="font-sans text-[32px] text-blue-500 font-extrabold">
                300k
              </span>
              <span className="mt-3 font-extrabold text-white">USD</span>
            </div>
            <span className="font-bold text-green-500">
              1.25% <AutoGraph style={{ color: "#00ff1a" }} />
            </span>
          </div>
        </div>
        <div className="w-[28%] h-[25vh] flex items-center justify-center bg-[#1a1a1a80] border border-gray-700 rounded-xl">
          <div className="p-3 bg-[#ffa20089] rounded-lg">
            <ReceiptLongOutlined />
          </div>
          <div className="flex flex-col px-5 py-2">
            <span>Total Amount</span>
            <span className="text-[12px] text-gray-400">Total Amount</span>
            <div className="flex items-center space-x-2">
              <span className="font-sans text-[32px] text-blue-500 font-extrabold">
                200k
              </span>
              <span className="mt-3 font-extrabold text-white">USD</span>
            </div>
          </div>
        </div>
        <div className="w-[28%] h-[25vh] flex items-center justify-center bg-[#1a1a1a80] border border-gray-700 rounded-xl">
          <div className="p-3 bg-[#ffa20089] rounded-lg">
            <ReceiptLongOutlined />
          </div>
          <div className="flex flex-col px-5 py-2">
            <span>Total Amount</span>
            <span className="text-[12px] text-gray-400">Total Profits</span>
            <div className="flex items-center space-x-2">
              <span className="font-sans text-[32px] text-blue-500 font-extrabold">
                100k
              </span>
              <span className="mt-3 font-extrabold text-white">USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 rounded-xl items-center justify-center bg-[#7d7c7c43] flex max-h-[50vh]">
        {!loading ? (
          <DataGrid
            rows={rowData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 12 },
              },
            }}
            pageSizeOptions={[0, 5]}
            sx={{ color: "white", fontWeight: "900", border: "2px" }}
            onRowClick={handleRowClick}
          />
        ) : (
          <span className="w-full py-20 font-extrabold text-center font-sans text-amber-500 text-[4vw]">
            Loading...
          </span>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
