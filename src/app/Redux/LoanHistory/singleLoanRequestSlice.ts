import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Types
interface User {
  user_uuid: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  selfie_base_image_64: string;
  date_of_birth: string;
  credit_score: string;
  email: string;
  phone: string | null;
  address: string;
  state: string;
  country: string;
  gender: string;
}

interface RequestDetails {
  loan_amount: number;
  loan_duration: number;
  interest_rate: number;
  loan_purpose: string;
  loan_product_name: string;
  monthly_repayment: number;
  created_at: string;
  updated_at: string;
  start_date: string;
  repaid_at: string | null;
  total_paid: number;
  remaining_balance: number;
  next_due_date: string | null;
  is_defaulted: number;
  status: string;
  approval_status: string;
  user_info_status: string;
  product_uuid: string;
  partner_uuid: string;
}

interface EmploymentInfo {
  employment_status: string;
  monthly_income: number;
  job_role: string;
  current_employer: string | null;
  business_name: string | null;
  business_address: string | null;
}

interface FinancialInfo {
  average_debit: number;
  average_credit: number;
  average_balance: number;
  average_income: number;
  average_expenses: number;
  wallet_balance: number;
  payment_account_number: string;
  payment_bank_name: string;
  bvn: string;
  perform_loans: any | null;
}

interface PartnerInfo {
  total_expense_fee: string;
  indication_of_interest_expense_fee: number;
  approval_expense_fee: number;
}

interface Document {
  id: number;
  uuid: string;
  user_uuid: string;
  document_name: string;
  path: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface CreditScoreMatch {
  percentage: number;
  user_score: string;
  product_range: {
    min: number;
    max: number;
  };
}

interface IncomeComparison {
  multiplier: number;
  user_income: string;
  product_minimum: number;
}

interface Prediction {
  approval_chance: number;
  credit_score_match: CreditScoreMatch;
  income_comparison: IncomeComparison;
}

interface Repayment {
  uuid: string;
  installment: number;
  amount_paid: string;
  balance: number;
  due_date: string;
  status: string;
  created_at: string;
}

interface Transaction {
  uuid: string;
  amount_paid: number;
  transaction_date: string;
  transaction_type: string;
  narration: string;
}

interface LoanData {
  uuid: string;
  user: User;
  request_details: RequestDetails;
  employment_info: EmploymentInfo;
  financial_info: FinancialInfo;
  partner_info: PartnerInfo;
  credit_info: any | null;
  documents: Document[];
  prediction: Prediction;
  repayment: Repayment[];
  transactions: Transaction[];
}

interface SingleLoanResponse {
  error: boolean;
  message: string;
  data: {
    loan: LoanData;
  };
}

interface SingleLoanState {
  data: LoanData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SingleLoanState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk
export const fetchSingleLoanRequest = createAsyncThunk(
  "singleLoanRequest/fetch",
  async (loanUuid: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.get<SingleLoanResponse>(
        `${BASE_URL}/api/partner/loan-history/single-loan-request/${loanUuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to fetch loan details");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

// Slice
const singleLoanRequestSlice = createSlice({
  name: 'singleLoanRequest',
  initialState,
  reducers: {
    resetSingleLoanRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleLoanRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleLoanRequest.fulfilled, (state, action: PayloadAction<SingleLoanResponse>) => {
        state.loading = false;
        state.data = action.payload.data.loan;
        state.error = null;
      })
      .addCase(fetchSingleLoanRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      });
  },
});

// Export actions
export const { resetSingleLoanRequest } = singleLoanRequestSlice.actions;

// Export reducer
export default singleLoanRequestSlice.reducer;