// userRolesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRoles } from "./user_role_thunk";


export interface RoleData {
  id: number;
  name: string;
  description: string | null;
  guard_name: string;
  partner_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  selected: boolean; // Made non-optional
  users?: number;    // Optional UI-specific field
  lastModified?: string; // Optional UI-specific field
}

interface UserRolesState {
  data: {
    total_roles: number;
    roles: RoleData[];
  };
  loading: boolean;
  error: string | null;
  currentPage: number;
  search: string;
  roleFilter: string;
}

const initialState: UserRolesState = {
  data: {
    total_roles: 0,
    roles: [],
  },
  loading: false,
  error: null,
  currentPage: 1,
  search: "",
  roleFilter: "",
};

const userRolesSlice = createSlice({
  name: "userRoles",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
    },
    toggleRoleSelection: (state, action: PayloadAction<number>) => {
      const role = state.data.roles.find(r => r.id === action.payload);
      if (role) {
        role.selected = !role.selected;
      }
    },
    toggleAllRolesSelection: (state) => {
      const allSelected = state.data.roles.every(role => role.selected);
      state.data.roles.forEach(role => {
        role.selected = !allSelected;
      });
    },
    resetUserRolesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          total_roles: action.payload.data.total_roles,
          roles: action.payload.data.roles.map((role: Omit<RoleData, 'selected'>) => ({
            ...role,
            selected: false, // Explicitly setting the required boolean
            users: 0,       // Default value for UI
            lastModified: role.updated_at || role.created_at || "N/A" // Derived field
          })),
        };
      })
      .addCase(UserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentPage,
  setSearch,
  setRoleFilter,
  toggleRoleSelection,
  toggleAllRolesSelection,
  resetUserRolesState,
} = userRolesSlice.actions;

export default userRolesSlice.reducer;