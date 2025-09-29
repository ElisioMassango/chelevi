// API Configuration and Base Service
const API_CONFIG = {
  baseUrl: 'https://example.com/api',
  storeSlug: 'chelevi', // Replace with actual store slug
  themeId: 'stylique',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

// Types for API responses
export interface ApiResponse<T = any> {
  max_price: number;
  status: number;
  message: string;
  data: T;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string | null;
  image: string;
  name: string;
  email: string;
  mobile: string;
  company_name?: string;
  country_id?: string;
  state_id?: string;
  city?: string;
  address?: string;
  postcode?: string;
  token?: string;
  token_type?: string;
  defaulte_address_id?: number;
}

export interface Address {
  id: number;
  customer_id: number;
  title: string;
  address: string;
  country_id: number;
  state_id: number;
  city_id: number;
  postcode: number;
  default_address: number;
  store_id: number;
  created_at: string;
  updated_at: string;
  country_name: string;
  state_name: string;
  city_name: string;
}

export interface BaseUrlData {
  base_url: string;
  image_url: string;
  payment_url: string;
}

export interface CurrencyData {
  currency: string;
  currency_name: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    // Get token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  private getHeaders(): Record<string, string> {
    const headers = { ...API_CONFIG.headers };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_CONFIG.baseUrl}/${API_CONFIG.storeSlug}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Customer login with email/password
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    const response = await this.request<User>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Set token if login successful
    if (response.status === 1 && response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  // Customer registration
  async register(data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    mobile: string;
  }): Promise<ApiResponse<User>> {
    const response = await this.request<User>('/register', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        ...data,
      }),
    });
    
    // Set token if registration successful
    if (response.status === 1 && response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  // Send OTP for phone verification
  async sendOTP(mobile: string): Promise<ApiResponse<{ message: string; otp_sent: boolean }>> {
    return this.request('/send-otp', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        mobile,
      }),
    });
  }

  // Verify OTP and login
  async verifyOTP(mobile: string, otp: string): Promise<ApiResponse<User>> {
    const response = await this.request<User>('/verify-otp', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        mobile,
        otp,
      }),
    });
    
    // Set token if verification successful
    if (response.status === 1 && response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  // Theme base URL
  async getBaseUrl(): Promise<ApiResponse<BaseUrlData>> {
    return this.request<BaseUrlData>('/', {
      method: 'POST',
    });
  }

  // Theme currency
  async getCurrency(): Promise<ApiResponse<CurrencyData>> {
    return this.request<CurrencyData>('/currency', {
      method: 'POST',
    });
  }

  // Forgot password - send OTP
  async forgotPasswordSendOtp(email: string): Promise<ApiResponse<{ message: string; infomation: string }>> {
    return this.request('/forgot-password-send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Forgot password - verify OTP
  async forgotPasswordVerifyOtp(email: string, otp: string): Promise<ApiResponse<User>> {
    const response = await this.request<User>('/forgot-password-verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
    
    // Set token if verification successful
    if (response.status === 1 && response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  // Forgot password - save new password
  async forgotPasswordSave(email: string, password: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/forgot-password-save', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Customer logout
  async logout(customerId: string): Promise<ApiResponse<{ message: string; logout: number }>> {
    const response = await this.request('/logOut', {
      method: 'POST',
      body: JSON.stringify({ customer_id: customerId }),
    });
    
    // Clear token on successful logout
    if (response.status === 1) {
      this.clearToken();
    }
    
    return response;
  }

  // Profile update
  async updateProfile(data: {
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
  }): Promise<ApiResponse<{ message: string; data: any }>> {
    return this.request('/profile-update', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        ...data,
      }),
    });
  }

  // Change password
  async changePassword(customerId: string, password: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/change-password', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: customerId,
        password,
      }),
    });
  }

  // Add address
  async addAddress(data: {
    customer_id: string;
    title: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    default_address: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/add-address', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        ...data,
      }),
    });
  }

  // Get user details
  async getUserDetail(customerId: string): Promise<ApiResponse<User>> {
    return this.request('/user-detail', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: customerId,
      }),
    });
  }

  // Delete user
  async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/user-delete', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        user_id: userId,
      }),
    });
  }

  // Get address list
  async getAddressList(customerId: string): Promise<ApiResponse<{
    current_page: number;
    data: Address[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }>> {
    return this.request('/address-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: customerId,
      }),
    });
  }

  // Delete address
  async deleteAddress(addressId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/delete-address', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        address_id: addressId,
      }),
    });
  }

  // Update address
  async updateAddress(data: {
    address_id: string;
    customer_id: string;
    title: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    default_address: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/update-address', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        ...data,
      }),
    });
  }

  // Update user image
  async updateUserImage(customerId: string, imageFile: File): Promise<ApiResponse<{ message: string }>> {
    const formData = new FormData();
    formData.append('theme_id', API_CONFIG.themeId);
    formData.append('customer_id', customerId);
    formData.append('image', imageFile);

    return this.request('/update-user-image', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
        'Authorization': this.token ? `Bearer ${this.token}` : '',
      },
    });
  }

  // Category APIs
  
  // Get categories with pagination
  async getCategories(): Promise<ApiResponse<PaginatedResponse<Category>>> {
    return this.request('/category', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get main category list
  async getMainCategoryList(): Promise<ApiResponse<Category[]>> {
    return this.request('/category-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get category products (authenticated)
  async getCategoryProducts(categoryId: string, subcategoryId?: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/categorys-product', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        category_id: categoryId,
        subcategory_id: subcategoryId || '',
      }),
    });
  }

  // Get category products (guest)
  async getCategoryProductsGuest(categoryId: string, subcategoryId?: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/categorys-product-guest', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        category_id: categoryId,
        subcategory_id: subcategoryId || '',
      }),
    });
  }

  // Get trending categories
  async getTrendingCategories(): Promise<ApiResponse<Category[]>> {
    return this.request('/tranding-category', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get trending category products (authenticated)
  async getTrendingCategoryProducts(mainCategoryId: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/tranding-category-product', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        main_category_id: mainCategoryId,
      }),
    });
  }

  // Get trending category products (guest)
  async getTrendingCategoryProductsGuest(mainCategoryId: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/tranding-category-product-guest', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        main_category_id: mainCategoryId,
      }),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;