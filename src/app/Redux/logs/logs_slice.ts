import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogsSlice } from "./logs_thunk";


interface LogEntry {
  uuid: string;
  partner_id: string;
  user_id: string | null;
  user: string | null;
  action: string;
  source_ip_address: string;
  user_agent: string;
  status: string;
  audit_level: string;
  created_at: string;
  updated_at: string;
}

interface PaginationData {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface AuditLogsState {
  data: LogEntry[];
  pagination: PaginationData;
  loading: boolean;
  error: string | null;
  searchParams: {
    search?: string;
    audit_level?: string;
    status?: string;
  };
}

const initialState: AuditLogsState = {
  data: [],
  pagination: {
    current_page: 1,
    first_page_url: "",
    from: 0,
    last_page: 1,
    last_page_url: "",
    links: [],
    next_page_url: null,
    path: "",
    per_page: 20,
    prev_page_url: null,
    to: 0,
    total: 0,
  },
  loading: false,
  error: null,
  searchParams: {},
};

const auditLogsSlice = createSlice({
  name: "auditLogs",
  initialState,
  reducers: {
    setSearchParams: (
      state,
      action: PayloadAction<{
        search?: string;
        audit_level?: string;
        status?: string;
      }>
    ) => {
      state.searchParams = action.payload;
    },
    clearSearchParams: (state) => {
      state.searchParams = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LogsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LogsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pagination = {
          current_page: action.payload.data.current_page,
          first_page_url: action.payload.data.first_page_url,
          from: action.payload.data.from,
          last_page: action.payload.data.last_page,
          last_page_url: action.payload.data.last_page_url,
          links: action.payload.data.links,
          next_page_url: action.payload.data.next_page_url,
          path: action.payload.data.path,
          per_page: action.payload.data.per_page,
          prev_page_url: action.payload.data.prev_page_url,
          to: action.payload.data.to,
          total: action.payload.data.total,
        };
      })
      .addCase(LogsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          action.error.message ||
          "Failed to fetch audit logs";
      });
  },
});

export const { setSearchParams, clearSearchParams } = auditLogsSlice.actions;
export default auditLogsSlice.reducer;