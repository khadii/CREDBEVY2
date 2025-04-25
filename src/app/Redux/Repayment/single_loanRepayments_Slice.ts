import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { single_loan_repayments } from './repayment_thunk';



interface RepaymentScheduleItem {
  uuid: string;
  installment: number;
  amount_paid: number;
  balance: number;
  due_date: string;
  status: 'paid' | 'partially_paid' | 'unpaid';
  created_at: string;
}

interface Transaction {
  uuid: string;
  amount_paid: number;
  transaction_date: string;
  transaction_type: string;
  narration: string;
}

interface RepaymentTransactionHistory {
  transactions: Transaction[];
  total_transactions: number;
}

interface LoanSummary {
  loan_amount : number;
  monthly_repayment: number;
  loan_purpose: string; 
  loan_terms: number;
  interest_rate: number;
  request_date: string;
  status: string;
  approval_status: string;
  total_repayment_count: number;
  total_upcoming_count: number;
  total_overdue_count: number;
  
}


interface UserInformation {
  uuid: string;
  credit_score: number;
  date_of_birth: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  country: string;
  gender:string
  firstname:string
lastname:string
selfie:string
}

interface LoanRepaymentsData {
  user_information: UserInformation;
  repayment_schedule: RepaymentScheduleItem[];
  repayment_transaction_history: RepaymentTransactionHistory;
  loan_summary: LoanSummary;
}

interface LoanRepaymentsState {
  data: LoanRepaymentsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoanRepaymentsState = {
  data: null,
  loading: false,
  error: null,
};



const loanRepaymentsSlice = createSlice({
  name: 'singleloanRepayments',
  initialState,
  reducers: {
    clearLoanRepaymentsData: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(single_loan_repayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(single_loan_repayments.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(single_loan_repayments.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLoanRepaymentsData } = loanRepaymentsSlice.actions;
export default loanRepaymentsSlice.reducer;