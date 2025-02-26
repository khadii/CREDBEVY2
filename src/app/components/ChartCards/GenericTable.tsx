// import React from "react";
// // import GenericTable from "./GenericTable/GenericTable";
// import { FaCircle } from "react-icons/fa";
// import GenericTable from "../TableTwo/MainTable";

// interface LoanData {
//   name: string;
//   email: string;
//   amount: string;
//   creditScore: string;
//   dateTime: string;
//   status: "Active" | "Repaid" | "Overdue";
// }

// const LoanHistoryExample = () => {
//   const loanHeaders = ["Name", "Email Address", "Amount Requested", "Credit Score", "Date/Time", "Status"];

//   const loanData: LoanData[] = [
//     {
//       name: "Oladejoye Timilehin",
//       email: "Timilehinoladejoye@gmail.com",
//       amount: "₦ 154,000,000.00",
//       creditScore: "743",
//       dateTime: "9/4/2023, 09:31 AM",
//       status: "Active",
//     },
//     // Add more data here...
//   ];

//   const titleProps = {
//     mainTitle: "All loan history",
//     count: "200 loans",
//     subtitle: "List of all loans and their status",
//   };

//   const renderStatus = (status: string) => {
//     switch (status) {
//       case "Active":
//         return (
//           <button className="flex items-center border border-[#FFF2C2] bg-[#FFFBEF] text-[#F4C418] px-2 h-[23px] rounded-full text-xs font-semibold">
//             <FaCircle className="text-[#F4C418] w-2 h-2 mr-1" />
//             Due
//           </button>
//         );
//       case "Repaid":
//         return (
//           <button className="flex items-center border border-[#BFFFD1] text-[#42BE65] bg-[#EFFAF2] px-2 h-[23px] rounded-full text-xs font-semibold">
//             <FaCircle className="text-[#42BE65] w-2 h-2 mr-1" />
//             Repaid
//           </button>
//         );
//       case "Overdue":
//         return (
//           <button className="flex items-center gap-2 border border-[#FFBAB1] text-[#E33A24] bg-[#FFF3F1] px-2 h-[23px] rounded-full text-xs font-semibold">
//             <FaCircle className="text-[#E33A24] w-2 h-2 mr-1" />
//             Overdue
//           </button>
//         );
//       default:
//         return <span>{status}</span>;
//     }
//   };

//   const renderRow = (item: LoanData, index: number) => (
//     <>
//       <td className="pl-[27px] py-4 px-6">
//         <div className="flex items-center gap-4 h-full">
//           <input type="checkbox" onClick={(e) => e.stopPropagation()} />
//           <img
//             src={`https://ui-avatars.com/api/?name=${item.name.replace(" ", "+")}&background=random`}
//             alt={item.name}
//             className="w-8 h-8 rounded-full"
//           />
//           <p className="truncate max-w-[120px]">{item.name}</p>
//         </div>
//       </td>
//       <td className="truncate max-w-[200px] py-4 px-6">{item.email}</td>
//       <td className="truncate max-w-[120px] py-4 px-6">{item.amount}</td>
//       <td className="truncate max-w-[35px] py-4 px-6">{item.creditScore}</td>
//       <td className="truncate max-w-[110px] py-4 px-6">{item.dateTime}</td>
//       <td className="truncate max-w-[154px] py-4 px-4">
//         {renderStatus(item.status)}
//       </td>
//     </>
//   );

//   return (
//     <GenericTable
//       headers={loanHeaders}
//       data={loanData}
//       titleProps={titleProps}
//       href="/loans"
//       itemsPerPage={5}
//       renderRow={renderRow}
//     />
//   );
// };

// export default LoanHistoryExample;