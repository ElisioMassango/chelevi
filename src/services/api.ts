// API Configuration and Base Service
import { logger } from '../utils/logger';

const API_CONFIG = {
  baseUrl: 'https://dashboard.sparktechnology.cloud/api',
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

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
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

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parent_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
  country_id: number;
}

export interface City {
  id: number;
  name: string;
  state_id: number;
  country_id: number;
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

export interface Product {
  id: number;
  name: string;
  slug: string;
  tag_id: string;
  product_code: string;
  category_id: number;
  subcategory_id: number;
  brand_id: number;
  label_id: number;
  tax_id: string;
  tax_status: string;
  shipping_id: number;
  preview_type: string;
  preview_video: string | null;
  preview_content: string | null;
  trending: number;
  status: number;
  video_url: string | null;
  track_stock: number;
  stock_order_status: string;
  price: number;
  sale_price: number;
  product_type: string | null;
  product_stock: number;
  low_stock_threshold: number;
  downloadable_product: string;
  product_weight: number | null;
  cover_image_path: string;
  cover_image_url: string;
  stock_status: string;
  variant_product: number;
  attribute_id: string;
  product_attribute: string;
  custom_field_status: number;
  custom_field: string | null;
  description: string;
  detail: string;
  specification: string;
  size_chart_title: string | null;
  size_chart_information: string | null;
  average_rating: number;
  store_id: number;
  created_by: number;
  is_active: number | null;
  created_at: string;
  updated_at: string;
  category_name: string;
  sub_category_name: string;
  in_cart: boolean;
  in_whishlist: boolean;
  final_price: string;
  product_data: {
    id: number;
    name: string;
    slug: string;
    image_path: string;
    icon_path: string;
    trending: number;
    status: number;
    store_id: number;
    created_at: string;
    updated_at: string;
    demo_field: string;
    category_item: number;
    total_product: number;
    category_id: number;
    image_path_full_url: string;
    icon_path_full_url: string;
  };
  sub_categoryct_data: {
    id: number;
    name: string;
    image_url: string;
    image_path: string;
    icon_path: string;
    category_id: number;
    status: number;
    store_id: number;
    created_at: string;
    updated_at: string;
    icon_img_path: string;
    image_path_full_url: string;
    icon_path_full_url: string;
  };
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

export interface ShippingMethod {
  id: number;
  method_name: string;
  zone_id: number;
  cost: string;
  product_cost: string | null;
  calculation_type: string | null;
  shipping_requires: string | null;
  store_id: number;
  created_at: string;
  updated_at: string;
}

export interface DeliveryCharge {
  original_price: string;
  charge_price: string;
  final_price: string;
}

export interface LoyaltyProgram {
  'loyality-program': {
    'loyality-program-title': string;
    'loyality-program-description': string;
    'loyality-program-your-cash': string;
    'loyality-program-copy-this-link-and-send-to-your-friends': string;
  };
  point: string;
  reward_history: PaginatedResponse<{
    id: number;
    product_order_id: string;
    order_date: string;
    customer_id: number;
    is_guest: number;
    product_json: string;
    product_id: string;
    product_price: number;
    coupon_price: number;
    delivery_price: number;
    tax_price: number;
    final_price: number;
    return_price: number;
    payment_comment: string;
    payment_type: string;
    payment_status: string;
    delivery_id: number;
    delivery_comment: string;
    delivered_status: number;
    delivery_date: string | null;
    confirmed_date: string | null;
    picked_date: string | null;
    shipped_date: string | null;
    return_status: number;
    return_date: string;
    cancel_date: string | null;
    reward_points: number;
    additional_note: string | null;
    deliveryboy_id: number | null;
    store_id: number;
    created_at: string;
    updated_at: string;
    demo_field: string;
    delivered_status_string: string;
    delivered_image: string;
    order_id_string: string;
    user_name: string;
  }>;
}

export interface Order {
  id: number;
  order_date: string;
  delivery_date: string | null;
  product_order_id: string;
  date: string;
  amount: number;
  delivery_id: number;
  delivered_status: number;
  return_status: number;
  reward_points: number;
  demo_field: string;
  delivered_status_string: string;
  delivered_image: string;
  order_id_string: string;
  return_date: string;
  user_name: string;
}

export interface OrderDetail {
  id: number;
  is_guest: number;
  order_id: string;
  delivery_date: string | null;
  order_reward_point: number;
  return_price: number;
  return_status_message: string | null;
  return_date: string;
  order_status_text: string;
  order_status: number;
  order_status_message: string;
  payment_status: string;
  deliveryboy_id: number | null;
  coupon_price: number;
  product: Array<{
    product_id: number;
    image: string;
    name: string;
    orignal_price: string;
    total_orignal_price: string;
    final_price: string;
    qty: number;
    variant_id: number;
    variant_name: string;
    return: number;
  }>;
  is_review: number;
  billing_informations: {
    name: string;
    address: string;
    state: string;
    country: string;
    city: string;
    post_code: string;
    email: string;
    phone: string;
  };
  delivery_informations: {
    name: string;
    address: string;
    state: string;
    country: string;
    city: string;
    post_code: string;
    email: string;
    phone: string;
  };
  paymnet_type: string;
  paymnet: string;
  delivery: string;
  delivered_charge: string;
  coupon_info: any;
  tax: {
    amountstring: number;
  };
  sub_total: string;
  final_price: string;
  tax_price: string;
  tax_name: string;
  tax_rate: number;
  tax_type: string;
  tax_id: number;
}

export interface BillingInfo {
  billing_postecode: string; // Mantém o typo conforme API
  email: string;
  billing_city: string; // Nome da cidade
  lastname: string;
  billing_company_name: string;
  delivery_city: string; // Nome da cidade
  delivery_state: string; // ID do estado
  billing_address: string;
  delivery_postcode: string;
  billing_user_telephone: string;
  firstname: string;
  delivery_country: string; // ID do país
  billing_country: string; // ID do país
  delivery_address: string;
  billing_state: string; // ID do estado
}

class ApiService {
  private token: string | null = null;

  constructor() {
    // Get token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { ...API_CONFIG.headers };
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
    const startTime = Date.now();
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    // Log API request
    logger.apiRequest(options.method || 'GET', url, options.body ? JSON.parse(options.body as string) : undefined);

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      const duration = Date.now() - startTime;
      
      // Log API response
      logger.apiResponse(options.method || 'GET', url, response.status, data);
      logger.performance(`${options.method || 'GET'} ${endpoint}`, duration);
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.apiError(options.method || 'GET', url, error);
      logger.performance(`${options.method || 'GET'} ${endpoint} (failed)`, duration);
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
    const response = await this.request<{ message: string; logout: number }>('/logOut', {
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
  async changePassword(data: {
    customer_id: string;
    new_password: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/change-password', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: data.customer_id,
        password: data.new_password,  
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

  // Location APIs
  
  // Get country list
  async getCountryList(): Promise<ApiResponse<Country[]>> {
    return this.request('/country-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get state list by country
  async getStateList(countryId: string): Promise<ApiResponse<State[]>> {
    return this.request('/state-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        country_id: countryId,
      }),
    });
  }

  // Get city list by state
  async getCityList(stateId: string): Promise<ApiResponse<City[]>> {
    return this.request('/city-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        state_id: stateId,
      }),
    });
  }

  // Newsletter subscription
  async subscribeNewsletter(email: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        email: email,
      }),
    });
  }

  // Get user details
  async getUserDetails(customerId: string): Promise<ApiResponse<User>> {
    return this.request('/user-detail', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: customerId,
      }),
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
    return this.request('/product-detail', {
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

  // Apply coupon
  async applyCoupon(couponCode: string): Promise<ApiResponse<CartResponse>> {
    return this.request('/apply-coupon', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        coupon_code: couponCode,
      }),
    });
  }

  // Shipping APIs
  
  // Get shipping methods
  async getShippingMethods(): Promise<ApiResponse<ShippingMethod[]>> {
    return this.request('/shipping', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get delivery methods
  async getDeliveryMethods(): Promise<ApiResponse<ShippingMethod[]>> {
    return this.request('/delivery-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Calculate delivery charge
  async calculateDeliveryCharge(data: {
    methodId: string;
    countryId: string;
    stateId: string;
  }): Promise<ApiResponse<DeliveryCharge>> {
    return this.request('/delivery-charge', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        method_id: data.methodId,
        country_id: data.countryId,
        state_id: data.stateId,
      }),
    });
  }

  // Loyalty Program APIs
  
  // Get loyalty program data
  async getLoyaltyProgram(): Promise<ApiResponse<LoyaltyProgram>> {
    return this.request('/loyality-program-json', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Get loyalty reward points
  async getLoyaltyReward(userId: string): Promise<ApiResponse<{ point: string }>> {
    return this.request('/loyality-reward', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        user_id: userId,
      }),
    });
  }

  // Order Management APIs
  
  // Get customer order list
  async getCustomerOrders(customerId: string): Promise<ApiResponse<PaginatedResponse<Order>>> {
    return this.request('/order-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        customer_id: customerId,
      }),
    });
  }

  // Get order detail
  async getOrderDetail(orderId: string): Promise<ApiResponse<OrderDetail>> {
    return this.request('/order-detail', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        order_id: orderId,
      }),
    });
  }

  // Place order
  async placeOrder(data: {
    paymentType: string;
    billingInfo: BillingInfo;
    couponInfo?: any;
    deliveryComment?: string;
    userId: string;
    customerId: string;
    paymentComment?: string;
    deliveryId: string;
    subTotal?: number;
    couponCode?: string;
  }): Promise<ApiResponse<{ order_id: number; slug: string }>> {
    const requestData = {
      payment_type: data.paymentType,
      billing_info: data.billingInfo,
      coupon_info: {},
      delivery_comment: data.deliveryComment || '',
      user_id: data.userId,
      customer_id: data.customerId,
      payment_comment: data.paymentComment || '',
      delivery_id: data.deliveryId,
      theme_id: API_CONFIG.themeId,
    };

    console.log('API Request Data:', JSON.stringify(requestData, null, 2));

    return this.request('/place-order', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  // Confirm order
  async confirmOrder(data: {
    paymentType: string;
    billingInfo: BillingInfo;
    deliveryId: string;
    couponInfo?: string;
    deliveryComment?: string;
    paymentComment?: string;
    price: string;
    shippingId: string;
    userId: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/confirm-order', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        payment_type: data.paymentType,
        billing_info: data.billingInfo,
        delivery_id: data.deliveryId,
        coupon_info: data.couponInfo || '',
        delivery_comment: data.deliveryComment || '',
        payment_comment: data.paymentComment || '',
        price: data.price,
        shipping_id: data.shippingId,
        user_id: data.userId,
      }),
    });
  }

  // Save order
  async saveOrder(data: {
    paymentType: string;
    billingInfo: BillingInfo;
    deliveryId: string;
    couponInfo?: any;
    methodId?: string;
    customerId: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/order-save', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        payment_type: data.paymentType,
        billing_info: data.billingInfo,
        delivery_id: data.deliveryId,
        coupon_info: data.couponInfo || null,
        method_id: data.methodId || null,
        customer_id: data.customerId,
      }),
    });
  }

  // Cancel order
  async cancelOrder(orderId: string, userId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/order-cancel', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        order_id: orderId,
        user_id: userId,
      }),
    });
  }

  // Change order status
  async changeOrderStatus(orderId: string, orderStatus: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/order-status-change', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        order_id: orderId,
        order_status: orderStatus,
      }),
    });
  }

  // Get return order list
  async getReturnOrders(customerId: string): Promise<ApiResponse<PaginatedResponse<Order>>> {
    return this.request('/return-order-list', {
      method: 'POST',
      body: JSON.stringify({
        customer_id: customerId,
        theme_id: API_CONFIG.themeId,
      }),
    });
  }

  // Product return
  async returnProduct(data: {
    productId: string;
    variantId: string;
    orderId: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/product-return', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        product_id: data.productId,
        variant_id: data.variantId,
        order_id: data.orderId,
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

  // Add product review (deprecated - use productRating instead)
  async addReview(data: {
    category_id: string;
    subcategory_id: string;
    product_id: string;
    rating_no: string;
    title: string;
    description: string;
    status: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/add-review', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        ...data,
      }),
    });
  }

  // Product rating (new API)
  async productRating(data: {
    id: string;
    user_id: string;
    rating_no: string;
    title: string;
    description: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.request('/product-rating', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        ...data,
      }),
    });
  }

  // Product variant list
  async getProductVariantInfo(data: {
    customer_id: string;
    product_id: string;
    variant: string;
    quantity: string;
  }): Promise<ApiResponse<{
    price: string;
    sale_price: string;
    currency_name: string;
    currency: string;
    product_stock: number;
    stock_order_status: string;
    description: string;
  }>> {
    return this.request('/variant-list', {
      method: 'POST',
      body: JSON.stringify({
        theme_id: API_CONFIG.themeId,
        ...data,
      }),
    });
  }

  // Search products (using bestseller products as base for search)
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    try {
      // Use bestseller products for search as they're more likely to be actual products
      const response = await this.getBestsellerProducts();
      
      if (response.status === 1) {
        let products: Product[] = [];
        
        // Handle different response structures
        if (Array.isArray(response.data)) {
          // Validate that items are products, not categories
          const validProducts = response.data.filter((item: any) => 
            item && typeof item === 'object' && 
            'final_price' in item && 
            'cover_image_url' in item
          );
          products = validProducts as Product[];
        } else if (response.data.data && Array.isArray(response.data.data)) {
          const validProducts = response.data.data.filter((item: any) => 
            item && typeof item === 'object' && 
            'final_price' in item && 
            'cover_image_url' in item
          );
          products = validProducts as Product[];
        }
        
        // Filter products based on search query
        const filteredProducts = products.filter(product =>
          product.name?.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.category_name?.toLowerCase().includes(query.toLowerCase()) ||
          product.sub_category_name?.toLowerCase().includes(query.toLowerCase())
        );
        
        return {
          status: 1,
          message: 'Search completed',
          max_price: 0,
          data: filteredProducts.slice(0, 10) // Limit to 10 results
        };
      }
      
      return {
        status: 0,
        message: 'Search failed',
        max_price: 0,
        data: []
      };
    } catch (error) {
      return {
        status: 0,
        message: 'Search failed',
        max_price: 0,
        data: []
      };
    }
  }

  // Search products for guests
  async searchProductsGuest(query: string): Promise<ApiResponse<Product[]>> {
    try {
      // Use bestseller products for search as they're more likely to be actual products
      const response = await this.getBestsellerProductsGuest();
      
      if (response.status === 1) {
        let products: Product[] = [];
        
        // Handle different response structures
        if (Array.isArray(response.data)) {
          // Validate that items are products, not categories
          const validProducts = response.data.filter((item: any) => 
            item && typeof item === 'object' && 
            'final_price' in item && 
            'cover_image_url' in item
          );
          products = validProducts as Product[];
        } else if (response.data.data && Array.isArray(response.data.data)) {
          const validProducts = response.data.data.filter((item: any) => 
            item && typeof item === 'object' && 
            'final_price' in item && 
            'cover_image_url' in item
          );
          products = validProducts as Product[];
        }
        
        // Filter products based on search query
        const filteredProducts = products.filter(product =>
          product.name?.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.category_name?.toLowerCase().includes(query.toLowerCase()) ||
          product.sub_category_name?.toLowerCase().includes(query.toLowerCase())
        );
        
        return {
          status: 1,
          message: 'Search completed',
          max_price: 0,
          data: filteredProducts.slice(0, 10) // Limit to 10 results
        };
      }
      
      return {
        status: 0,
        message: 'Search failed',
        max_price: 0,
        data: []
      };
    } catch (error) {
      return {
        status: 0,
        message: 'Search failed',
        max_price: 0,
        data: []
      };
    }
  }
  
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;