import React, { useState } from "react";
import { YearDropdown } from "../Yeardropdown";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import Card from "../Card";
import LoanApprovalChart from "../ChartCards/Piechart";
import LineChartTwo from "../ChartCards/doublelinechart";
import EqualHeightContainer from "../equator";
import Search from "../Search";
import FinancialTable from "./FinancialTable";

// Mock data for financial products
const mockLoanData = [
  {
    uuid: "1",
    Payee: "Business Quick Loan",
    Type: "Short-term",
    Amount: "₦500,000",
   Transactions_ID: 'CBqe8y82re29u2',
    maximum_credit_score: 'CBqe8y82re29u2',
    Date: "9/14/2023",
    Method: "Credit Card",
    status: "Active"
  },
  {
    uuid: "2",
    Payee: "Personal Flex Loan",
    Type: "Medium-term",
    Amount: "₦1,500,000",
   Transactions_ID: 'CBqe8y82re29u2',
    maximum_credit_score: 'CBqe8y82re29u2',
    Date: "9/14/2023",
    Method: "Credit Card",
    status: "Active"
  },
  {
    uuid: "3",
    Payee: "Agricultural Loan",
    Type: "Long-term",
    Amount: "₦3,000,000",
   Transactions_ID: 'CBqe8y82re29u2',
    maximum_credit_score: 'CBqe8y82re29u2',
    Date: "9/14/2023",
    Method: "Digital Wallet",
    status: "Inactive"
  },

  {
    uuid: "5",
    Payee: "Education Loan",
    Type: "Long-term",
    Amount: "₦2,000,000",
   Transactions_ID: 'CBqe8y82re29u2',
    maximum_credit_score: 'CBqe8y82re29u2',
    Date: "9/14/2023",
    Method: "Bank Transfer",
    status: "Active"
  },
  {
    uuid: "6",
    Payee: "Home Improvement Loan",
    Type: "Medium-term",
    Amount: "₦2,500,000",
   Transactions_ID: 'CBqe8y82re29u2',
    maximum_credit_score: 'CBqe8y82re29u2',
    Date: "9/14/2023",
    Method: "Credit Card",
    status: "Active"
  },
];

export default function TransactionHistory() {
  const data = [
    { color: "#156064", name: "Revenue" },
    { color: "#EC7910", name: "Profit" },
  ];
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockLoanData.length / itemsPerPage);

  // Paginate the data
  const paginatedData = mockLoanData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = [
    {
      title: "Total Transaction Volume",
      amount: "₦5,000,000",
      percentage: "10%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Transaction Processed",
      amount: "₦2,500,000",
      percentage: "5%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Revenue Generated",
      amount: "1,200",
      percentage: "7%",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];
  
  const statsTwo = [
    {
      title: "Total Income ",
      amount: "₦5,000,000",
      percentage: "10%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Expenses",
      amount: "₦2,500,000",
      percentage: "5%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Net Revenue",
      amount: "1,200",
      percentage: "7%",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];

  return (
    <div className="pb-[115px]">
      <YearDropdown
        years={[2023, 2024]}
        selectedYear={2024}
        setSelectedYear={(year: any) => console.log(year)}
        withdrawal={2}
        onOptionalButtonClick={() => alert("Button clicked!")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            title={stat.title}
            amount={stat.amount}
            percentage={stat.percentage}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statsTwo.map((stat, index) => (
          <Card
            key={index}
            title={stat.title}
            amount={stat.amount}
            percentage={stat.percentage}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="mb-[24px]">
        <EqualHeightContainer
          leftContent={
            <LineChartTwo
              title={"Repayment VS Default Trends"}
              description={"Trend showing repayment vs default ."}
              totalAmount={"$1.2M"}
              data={data}
              lineData={[
                { month: "Jan", firstValue: 65, secondValue: 70 },
                { month: "Feb", firstValue: 59, secondValue: 62 },
                { month: "Mar", firstValue: 72, secondValue: 68 },
                { month: "Apr", firstValue: 78, secondValue: 74 },
                { month: "May", firstValue: 85, secondValue: 82 },
                { month: "Jun", firstValue: 80, secondValue: 87 },
                { month: "Jul", firstValue: 75, secondValue: 79 },
                { month: "Aug", firstValue: 90, secondValue: 85 },
                { month: "Sep", firstValue: 88, secondValue: 90 },
                { month: "Oct", firstValue: 82, secondValue: 84 },
                { month: "Nov", firstValue: 77, secondValue: 79 },
                { month: "Dec", firstValue: 84, secondValue: 88 },
              ]}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          }
          rightContent={
            <LoanApprovalChart
              title={""}
              description={""}
              total={""}
              data={data}
            />
          }
        />
      </div>

      {/* search */}
      <Search/>

      {/* Financial Products Table */}
      <FinancialTable 
          laon_table_data_all={paginatedData} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage}
          titleProps={{
            title: "Transaction History",
            description: "All financial transactions recorded",
            totalAmount: `${mockLoanData.length} transactions`
          }}
          bulkAction={{
            label: "Bulk Action",
            options: ["Export", "Print", "Archive"],
            onSelect: (option: string) => console.log(option)
          }}
        />
    </div>
  );
}