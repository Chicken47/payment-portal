import { RecoilRoot } from "recoil";
import Dashboard from "./dashboard";
import TransactionDetails from "./transactionDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="w-full min-h-screen bg-black">
      <div
        id="fixed-background"
        className="h-full w-full fixed blur-[50px] pointer-events-none"
      >
        <div className="h-[30vw] w-[30vw] bg-gradient-to-br from-red-500 to-blue-600 rounded-full animate-slow-spin"></div>
        <div className="h-[30vw] w-[30vw] bg-gradient-to-r from-indigo-800 to-cyan-500 rounded-full animate-slow-spin -mt-[20vw] ml-[60vw]"></div>
        <div className="h-[30vw] w-[30vw] bg-gradient-to-r from-amber-500 to-orange-800 rounded-full animate-slow-spin ml-[26vw]"></div>
      </div>
      <div
        id="content"
        className="relative z-50 flex flex-col items-center w-full h-full text-white"
      >
        <BrowserRouter>
          <RecoilRoot>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/:id" element={<TransactionDetails />} />
            </Routes>
          </RecoilRoot>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
