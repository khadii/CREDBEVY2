import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


export const dashboard_wallet = createAsyncThunk(
    "dashboard/wallet-balance",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        console.log("Token from cookies:", token);
        
        const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/wallet-balance", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        return response.data;  
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "unauthorised");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);




export const _revenue = createAsyncThunk(
  "dashboard/total-revenue",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Token from cookies:", token);
      
      const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/total-revenue", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;  
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "unauthorised");
    } else if (error.request) {
      return rejectWithValue("No response from the server. Please check your network connection.");
    } else {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
}
);


export const loan_approval_rates = createAsyncThunk(
  "dashboard/loan_approval_rate",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Token from cookies:", token);
      
      const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/loan-approval-rate", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;  
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "unauthorised");
    } else if (error.request) {
      return rejectWithValue("No response from the server. Please check your network connection.");
    } else {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
}
);


export const _Loan_Disbursed = createAsyncThunk(
  "dashboard/_Loan_Disbursed",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Token from cookies:", token);
      
      const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/total-loan-disbursed", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;  
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "unauthorised");
    } else if (error.request) {
      return rejectWithValue("No response from the server. Please check your network connection.");
    } else {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
}
);


export const _Loan_volume = createAsyncThunk(
  "dashboard/_Loan_volume",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Token from cookies:", token);
      
      const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/total-loan-volume", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;  
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "unauthorised");
    } else if (error.request) {
      return rejectWithValue("No response from the server. Please check your network connection.");
    } else {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
}
);



export const _pending_loans = createAsyncThunk(
  "dashboard/pending-loans",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Token from cookies:", token);
      
      const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/pending-loans", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;  
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "unauthorised");
    } else if (error.request) {
      return rejectWithValue("No response from the server. Please check your network connection.");
    } else {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
}
);

export const _Default_Rate = createAsyncThunk(
  "dashboard/Default_Rate",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Token from cookies:", token);
      
      const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/default-rate", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;  
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "unauthorised");
    } else if (error.request) {
      return rejectWithValue("No response from the server. Please check your network connection.");
    } else {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
}
);

export const total_revenue_perer_time = createAsyncThunk(
  "dashboard/total_revenue_perer_time",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      console.log("Token from cookies:", token);
      
      const response = await axios.get("https://credbevy.jbenergyservices.com/public/api/partner/total-revenue-per-time", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;  
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "unauthorised");
    } else if (error.request) {
      return rejectWithValue("No response from the server. Please check your network connection.");
    } else {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
}
);




// export const loan_approval_rates = createAsyncThunk(
//   "dashboard/loan_approval_rate",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = '472d3be7-565e-479a-ad0d-c915205df624-6QFH8c2119ea1-c16c-418f-8908-825b0e0ae8d9_UEPR52174dee3-a8a6-48'
//       if (!token) {
//         return rejectWithValue("Authentication token is missing.");
//       }

//       console.log("Token from cookies:", token);

//       const response = await axios.get(
//         "https://credbevy.jbenergyservices.com/public/api/partner/loan-approval-rate",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "X-Partner-API-Key": "472d3be7-565e-479a-ad0d-c915205df624-6QFH8c2119ea1-c16c-418f-8908-825b0e0ae8d9_UEPR52174dee3-a8a6-48", 
//           },
//         }
//       );

//       return response.data;
//     } catch (error:any) {
//       if (error.response?.data) {
//         return rejectWithValue(error.response.data.message || "Unauthorized");
//       } else if (error.request) {
//         return rejectWithValue("No response from the server. Please check your network connection.");
//       } else {
//         return rejectWithValue("An unexpected error occurred. Please try again.");
//       }
//     }
//   }
// );
