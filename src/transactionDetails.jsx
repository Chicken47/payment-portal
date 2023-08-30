import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { tableData } from "./state";
import { useParams } from "react-router-dom";
import { DoubleArrow, HighlightOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TransactionDetails = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const data = useRecoilValue(tableData);
  const selectedRow = data.find((data) => data?.id === Number(id));
  useEffect(() => {
    console.log(data, "aaa");
    console.log(id);
    console.log(selectedRow, "row");
  }, []);
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="p-5 rounded-lg bg-[#1a1a1a80] space-y-5">
        <div className="flex items-start justify-between w-full">
          <div className="text-white font-bold text-[2vw]">
            Invoice Number: {selectedRow?.invoice_no}
          </div>
          <div
            onClick={() => navigate("/")}
            className="scale-150 cursor-pointer"
          >
            <HighlightOffOutlined />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[3vw] font-extrabold tracking-widest">
            {selectedRow?.payer}
          </span>
          <DoubleArrow />
          <span className="text-[3vw] font-extrabold tracking-widest">
            {selectedRow?.payee}
          </span>
        </div>
        <div className="w-full font-extrabold text-right text-[2vw]">
          {selectedRow?.transaction_date}
        </div>
        <div className="w-full text-center text-[1.5vw] uppercase underline">
          {selectedRow?.status}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
