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

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  store_id: number;
  created_at: string;
  updated_at: string;
  demo_field: string;
  image_path_full_url: string;
}

export interface ProductReview {
  product_image: string;
  title: string;
  sub_title: string;
  rating: number;
  review: string;
  user_image: string;
  user_name: string;
  user_email: string;
}

export interface ProductDetailResponse {
  product_info: Product;
  product_image: ProductImage[];
  product_Review: ProductReview[];
  releted_products: Product[];
  product_instruction: any[];
}

export interface ProductVariant {
  id: number;
  variant: string;
  stock: number;
  original_price: string;
  discount_price: string;
  final_price: string;
}

export interface CartItem {
  cart_id: number;
  cart_created: string;
  product_id: number;
  image: string;
  name: string;
  orignal_price: string;
  total_orignal_price: string;
  per_product_discount_price: string;
  discount_price: string;
  final_price: string;
  qty: number;
  variant_id: number;
  variant_name: string;
  return: number;
  shipping_price: string;
}

export interface CouponInfo {
  coupon_id: number;
  coupon_name: string;
  coupon_code: string;
  coupon_discount_type: string;
  coupon_discount_number: string;
  coupon_discount_amount: string;
  coupon_final_amount: string;
}

export interface CartResponse {
  product_list: CartItem[];
  product_discount_price: number;
  sub_total: number;
  coupon_info: CouponInfo;
  tax_price: string;
  total_tax_price: string;
  tax_id: string;
  tax_rate: string;
  tax_type: string;
  tax_name: string;
  cart_total_product: number;
  cart_total_qty: number;
  original_price: string;
  total_final_price: string;
  final_price: string;
  total_sub_price: string;
  total_coupon_price: number;
  shipping_original_price: number;
  coupon_code: string | null;
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

  // Product APIs
  
  // Get product detail (authenticated)
  async getProductDetail(productId: string): Promise<ApiResponse<ProductDetailResponse>> {
    return this.request('/product-detail', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        id: productId,
      }),
    });
  }

  // Get product detail (guest)
  async getProductDetailGuest(productId: string): Promise<ApiResponse<ProductDetailResponse>> {
    return this.request('/product-detail-guest', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        id: productId,
      }),
    });
  }

  // Get product variant list
  async getProductVariantList(data: {
    productId: string;
    customerId: string;
    variant: string;
    quantity: string;
  }): Promise<ApiResponse<ProductVariant>> {
    return this.request('/variant-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: data.customerId,
        product_id: data.productId,
        variant: data.variant,
        quantity: data.quantity,
      }),
    });
  }

  // Add product rating
  async addProductRating(data: {
    productId: string;
    userId: string;
    rating: number;
    title: string;
    description: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/product-rating', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        id: data.productId,
        user_id: data.userId,
        rating_no: data.rating.toString(),
        title: data.title,
        description: data.description,
      }),
    });
  }

  // Get bestseller products (authenticated)
  async getBestsellerProducts(categoryId?: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/bestseller', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        category_id: categoryId || '',
      }),
    });
  }

  // Get bestseller products (guest)
  async getBestsellerProductsGuest(categoryId?: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/bestseller-guest', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        category_id: categoryId || '',
      }),
    });
  }

  // Get featured products (authenticated)
  async getFeaturedProducts(): Promise<ApiResponse<Category[]>> {
    return this.request('/featured-products', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get featured products (guest)
  async getFeaturedProductsGuest(): Promise<ApiResponse<Category[]>> {
    return this.request('/featured-products-guest', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Check variant stock
  async checkVariantStock(productId: string, variantSku: string): Promise<ApiResponse<ProductVariant>> {
    return this.request('/check-variant-stock', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        variant_sku: variantSku,
      }),
    });
  }

  // Get recent products (authenticated)
  async getRecentProducts(): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/recent-product', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get recent products (guest)
  async getRecentProductsGuest(): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/recent-product-guest', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get related products (authenticated)
  async getRelatedProducts(productId: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/releted-product', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
      }),
    });
  }

  // Get related products (guest)
  async getRelatedProductsGuest(productId: string): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/releted-product-guest', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
      }),
    });
  }

  // Get discount products
  async getDiscountProducts(): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request('/discount-products', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Cart APIs
  
  // Add to cart
  async addToCart(data: {
    customerId: string;
    productId: string;
    quantity: number;
    variantId?: string;
  }): Promise<ApiResponse<{ message: string; count: number }>> {
    return this.request('/add-cart', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: data.customerId,
        product_id: data.productId,
        qty: data.quantity.toString(),
        variant_id: data.variantId || '0',
      }),
    });
  }

  // Update cart quantity
  async updateCartQuantity(data: {
    customerId: string;
    productId: string;
    quantityType: 'increase' | 'decrease';
    variantId?: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/cart-qty', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: data.customerId,
        product_id: data.productId,
        quantity_type: data.quantityType,
        variant_id: data.variantId || '0',
      }),
    });
  }

  // Get cart list
  async getCartList(customerId: string): Promise<ApiResponse<CartResponse>> {
    return this.request('/cart-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: customerId,
      }),
    });
  }

  // Check cart
  async checkCart(customerId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/cart-check', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: customerId,
      }),
    });
  }

  // Check cart (guest)
  async checkCartGuest(data: {
    productId: string;
    variantId: string;
    quantity: string;
  }): Promise<ApiResponse<{
    cart: Array<{
      product_id: number;
      varient_id: number;
      qty: number;
      status: boolean;
      message: string;
      product_qty: number;
    }>;
  }>> {
    return this.request('/cart-check-guest', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        product_id: data.productId,
        variant_id: data.variantId,
        qty: data.quantity,
      }),
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