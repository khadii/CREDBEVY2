import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoanRequest {
  uuid: string;
  user: {
    user_uuid: string;
    first_name: string;
    middle_name: string;
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
  };
  request_details: {
    loan_amount: number;
    loan_duration: number;
    interest_rate: number;
    loan_purpose: string;
    loan_product_name: string;
    monthly_repayment: number;
    created_at: string;
    updated_at: string;
    start_date: string | null;
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
  };
  employment_info: {
    employment_status: string;
    monthly_income: number;
    job_role: string;
    current_employer: string | null;
    business_name: string;
    business_address: string;
  };
  financial_info: {
    average_debit: number;
    average_credit: number;
    average_balance: number;
    average_income: number;
    average_expenses: number;
    wallet_balance: number;
    payment_account_number: string;
    payment_bank_name: string;
    bvn: string;
    perform_loans: any;
  };
  partner_info: {
    total_expense_fee: string;
    indication_of_interest_expense_fee: number;
    approval_expense_fee: number;
  };
  credit_info: any;
  documents: Array<{
    id: number;
    uuid: string;
    user_uuid: string;
    document_name: string;
    path: string;
    category: string;
    created_at: string;
    updated_at: string;
  }>;
  prediction: {
    approval_chance: number;
    credit_score_match: {
      percentage: number;
      user_score: string;
      product_range: {
        min: number;
        max: number;
      };
    };
    income_comparison: {
      multiplier: number;
      user_income: string;
      product_minimum: number;
    };
  };
}

interface ApiResponse {
  error: boolean;
  message: string;
  data: {
    loan: LoanRequest;
  };
}

interface LoanRequestState {
  data: LoanRequest | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoanRequestState = {
  data: null,
  loading: false,
  error: null,
};

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchSingleLoanRequest = createAsyncThunk(
  'loans/singleRequest',
  async (loanUuid: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        return rejectWithValue('Authentication token is missing.');
      }

      const response = await axios.get<ApiResponse>(
        `${BASE_URL}/api/partner/customers/single-loan-request/${loanUuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Unauthorized');
      } else if (error.request) {
        return rejectWithValue('No response from the server. Please check your network connection.');
      } else {
        return rejectWithValue('An unexpected error occurred. Please try again.');
      }
    }
  }
);

const singleLoanRequestSlice = createSlice({
  name: 'singleLoanRequest',
  initialState,
  reducers: {
    clearLoanRequest: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleLoanRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleLoanRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.loan;
      })
      .addCase(fetchSingleLoanRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLoanRequest } = singleLoanRequestSlice.actions;

export default singleLoanRequestSlice.reducer;