import React, { useState, useEffect } from 'react';
import { User, MapPin, Package, Heart, Settings, LogOut, Phone, Mail, CreditCard as Edit, Save, X, Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useUserProfile, useAddresses } from '../hooks/useUser';
import { useCustomerOrders } from '../hooks/useProducts';
import { useNewsletter } from '../hooks/useNewsletter';
import CheckoutLocationSelector from '../components/CheckoutLocationSelector';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { 
    profile, 
    updateProfile,
    changePassword
  } = useUserProfile();
  const { addresses } = useAddresses();
  const { orders: userOrders, loading: ordersLoading } = useCustomerOrders(user?.id || '');
  const { subscribe, isSubscribing } = useNewsletter();
  const navigate = useNavigate();
  const t = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  // Update form data when profile or user data changes
  useEffect(() => {
    setFormData({
      name: profile?.name || user?.name || '',
      email: profile?.email || user?.email || '',
      phone: profile?.mobile || user?.phone || '',
      address: profile?.address || '',
      city: profile?.city || '',
      postalCode: profile?.postcode || ''
    });
  }, [profile, user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      // Split name into first and last name
      const [firstName, ...lastNameParts] = formData.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        telephone: formData.phone,
      });
      
      setEditingField(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(t.profile.passwordsNotMatch);
      return;
    }

    try {
      await changePassword(user.id,passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await subscribe(newsletterEmail);
      setNewsletterEmail('');
      setShowNewsletterForm(false);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    }
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  const handleOrderTracking = (orderId: string) => {
    navigate(`/order-tracking/${orderId}`);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: profile?.name || user?.name || '',
      email: profile?.email || user?.email || '',
      phone: profile?.mobile || user?.phone || '',
      address: profile?.address || '',
      city: profile?.city || '',
      postalCode: profile?.postcode || ''
    });
    setEditingField(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-success bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-warning bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="profile-page py-12">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-text-primary" />
                </div>
                <h2 className="font-semibold text-lg">{user?.name || t.profile.user}</h2>
                <p className="text-text-secondary text-sm">{user?.phone}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-secondary text-text-primary' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <User size={18} />
                  {t.profile.overview}
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-secondary text-text-primary' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Package size={18} />
                  {t.profile.orders}
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'wishlist' 
                      ? 'bg-secondary text-text-primary' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Heart size={18} />
                  {t.profile.wishlist} ({wishlistItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-secondary text-text-primary' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <MapPin size={18} />
                  {t.profile.addresses}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-secondary text-text-primary' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings size={18} />
                  {t.profile.settings}
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-error hover:bg-red-50"
                >
                  <LogOut size={18} />
                  {t.profile.logout}
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{t.profile.profileOverview}</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-text-secondary text-sm">{t.profile.totalOrders}</p>
                        <p className="text-2xl font-bold">{userOrders.length}</p>
                      </div>
                      <Package size={32} className="text-secondary" />
                    </div>
                  </div>
                
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-text-secondary text-sm">{t.profile.wishlistItems}</p>
                        <p className="text-2xl font-bold">{wishlistItems.length}</p>
                      </div>
                      <Heart size={32} className="text-secondary" />
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-4">{t.profile.recentOrders}</h2>
                  <div className="space-y-4">
                    {userOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleOrderClick(order.id.toString())}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-lg">{t.profile.orderNumber} #{order.id}</p>
                            <p className="text-sm text-text-secondary">
                              {new Date((order as any).created_at).toLocaleDateString('pt-BR')} {t.profile.at} {new Date((order as any).created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">MT{(order as any).total_amount || (order as any).total}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor((order as any).order_status || (order as any).status)}`}>
                              {(order as any).order_status || (order as any).status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-text-secondary">
                          <span>{(order as any).items_count || 0} {t.profile.products}</span>
                          <span>{t.profile.clickToSeeDetails}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{t.profile.myOrders}</h1>
                
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full"></div>
                  </div>
                ) : userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t.profile.noOrdersFound}</h3>
                    <p className="text-gray-500">{t.profile.noOrdersDescription}</p>
                  </div>
                ) : (
                         <div className="space-y-4">
                           {userOrders.map((order) => (
                             <div key={order.id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
                               <div className="flex items-center justify-between mb-4">
                                 <div>
                                   <h3 className="font-semibold text-lg">{t.profile.orderNumber} #{order.id}</h3>
                                   <p className="text-text-secondary">
                                     {t.profile.orderDate} {new Date((order as any).created_at).toLocaleDateString('pt-BR')} {t.profile.at} {new Date((order as any).created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                   </p>
                                 </div>
                                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor((order as any).order_status || (order as any).status)}`}>
                                   {(order as any).order_status || (order as any).status}
                                 </span>
                               </div>
                               
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                 <div className="bg-gray-50 p-3 rounded-lg">
                                   <p className="text-sm text-text-secondary mb-1">{t.profile.orderTotal}</p>
                                   <p className="text-lg font-bold text-primary">MT{(order as any).total_amount || (order as any).total}</p>
                                 </div>
                                 <div className="bg-gray-50 p-3 rounded-lg">
                                   <p className="text-sm text-text-secondary mb-1">{t.profile.products}</p>
                                   <p className="text-lg font-semibold">{(order as any).items_count || 0} {t.profile.products}</p>
                                 </div>
                                 <div className="bg-gray-50 p-3 rounded-lg">
                                   <p className="text-sm text-text-secondary mb-1">{t.profile.paymentMethod}</p>
                                   <p className="text-lg font-semibold">{(order as any).payment_type || 'M-Pesa'}</p>
                                 </div>
                               </div>
                               
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                   <span className="text-sm text-text-secondary">
                                     ID: {order.id} • {(order as any).items_count || 0} {t.profile.products}
                                   </span>
                                 </div>
                                 <div className="flex gap-2">
                                   <button 
                                     onClick={() => handleOrderClick(order.id.toString())}
                                     className="btn btn-outline btn-sm"
                                   >
                                     {t.profile.viewDetails}
                                   </button>
                                   <button 
                                     onClick={() => handleOrderTracking(order.id.toString())}
                                     className="btn btn-primary btn-sm"
                                   >
                                     {t.profile.trackOrder}
                                   </button>
                                 </div>
                               </div>
                             </div>
                           ))}
                         </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{t.profile.myWishlist}</h1>
                
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-2 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="bg-white p-6 rounded-lg border">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <p className="text-lg font-bold mb-3">MT{item.price}</p>
                            <div className="flex gap-2">
                              <button className="btn btn-primary btn-sm flex-1">
                                {t.profile.addToCart}
                              </button>
                              <button className="btn btn-outline btn-sm">
                                {t.profile.remove}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-text-secondary">{t.profile.emptyWishlist}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{t.profile.myAddresses}</h1>
                <p className="text-text-secondary">{t.profile.manageAddresses}</p>
                
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6">{t.profile.addNewAddress}</h2>
                  
                  <form className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">{t.profile.addressTitle}</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={t.profile.addressTitlePlaceholder}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">{t.profile.fullAddress}</label>
                      <textarea
                        className="form-textarea"
                        placeholder={t.profile.fullAddressPlaceholder}
                        rows={3}
                      />
                    </div>
                    
                    <CheckoutLocationSelector
                      onLocationChange={(location) => {
                        console.log('Location selected:', location);
                      }}
                      showLabels={true}
                      required={true}
                    />
                    
                    <div className="form-group">
                      <label className="form-label">{t.profile.postalCode}</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={t.profile.postalCodePlaceholder}
                      />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="text-sm">{t.profile.defaultAddressLabel}</span>
                      </label>
                    </div>
                    
                    <div className="flex gap-4">
                      <button type="submit" className="btn btn-primary">
                        {t.profile.addAddress}
                      </button>
                      <button type="button" className="btn btn-outline">
                        {t.profile.cancel}
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Existing Addresses */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t.profile.savedAddresses}</h3>
                  {addresses && addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{address.title || t.profile.address}</h4>
                            <p className="text-sm text-text-secondary mt-1">
                              {address.address}, {address.city}, {address.country}
                            </p>
                            {address.is_default && (
                              <span className="inline-block mt-2 px-2 py-1 bg-primary text-white text-xs rounded-full">
                                {t.profile.default}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="btn btn-outline btn-sm">
                              {t.profile.edit}
                            </button>
                            <button className="btn btn-error btn-sm">
                              {t.profile.delete}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t.profile.noAddressesFound}</h3>
                      <p className="text-gray-500">{t.profile.noAddressesDescription}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{t.profile.accountSettings}</h1>
                <p className="text-text-secondary">{t.profile.manageInfo}</p>
                
                {/* Password Change Section */}
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Lock size={20} />
                    {t.profile.changePasswordTitle}
                  </h2>
                  
                  {!showPasswordForm ? (
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="btn btn-outline"
                    >
                      {t.profile.changePasswordButton}
                    </button>
                  ) : (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">{t.profile.currentPassword}</label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="form-input pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">{t.profile.newPassword}</label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="form-input pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">{t.profile.confirmPassword}</label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="form-input pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <button type="submit" className="btn btn-primary">
                          {t.profile.changePasswordButton}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          }}
                          className="btn btn-outline"
                        >
                          {t.profile.cancel}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                
                {/* Newsletter Section */}
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Mail size={20} />
                    {t.profile.newsletter}
                  </h2>
                  
                  {!showNewsletterForm ? (
                    <div className="space-y-4">
                      <p className="text-text-secondary">
                        {t.profile.newsletterDescription}
                      </p>
                      <button
                        onClick={() => setShowNewsletterForm(true)}
                        className="btn btn-primary"
                      >
                        {t.profile.subscribeNewsletter}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">{t.profile.newsletterEmail}</label>
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="form-input"
                          placeholder={t.profile.newsletterEmailPlaceholder}
                          required
                        />
                      </div>
                      
                      <div className="flex gap-4">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubscribing}
                        >
                          {isSubscribing ? t.profile.subscribing : t.profile.subscribe}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewsletterForm(false);
                            setNewsletterEmail('');
                          }}
                          className="btn btn-outline"
                        >
                          {t.profile.cancel}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6">{t.profile.personalInfo}</h2>
                  
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <User size={20} className="text-gray-400" />
                          <div className="flex-1">
                            <p className="font-medium mb-1">{t.profile.fullName}</p>
                            {editingField === 'name' ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                  className="form-input flex-1"
                                  autoFocus
                                />
                                <button
                                  onClick={handleSave}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <p className="text-text-secondary">{formData.name}</p>
                            )}
                          </div>
                        </div>
                        {editingField !== 'name' && (
                          <button
                            onClick={() => setEditingField('name')}
                            className="text-accent hover:text-accent/70"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Email Field */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Mail size={20} className="text-gray-400" />
                          <div className="flex-1">
                            <p className="font-medium mb-1">{t.profile.email}</p>
                            {editingField === 'email' ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  className="form-input flex-1"
                                  autoFocus
                                />
                                <button
                                  onClick={handleSave}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <p className="text-text-secondary">{formData.email}</p>
                            )}
                          </div>
                        </div>
                        {editingField !== 'email' && (
                          <button
                            onClick={() => setEditingField('email')}
                            className="text-accent hover:text-accent/70"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Phone Field */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Phone size={20} className="text-gray-400" />
                          <div className="flex-1">
                            <p className="font-medium mb-1">{t.profile.phone}</p>
                            {editingField === 'phone' ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  className="form-input flex-1"
                                  autoFocus
                                />
                                <button
                                  onClick={handleSave}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <p className="text-text-secondary">{formData.phone}</p>
                            )}
                          </div>
                        </div>
                        {editingField !== 'phone' && (
                          <button
                            onClick={() => setEditingField('phone')}
                            className="text-accent hover:text-accent/70"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Address Field */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <MapPin size={20} className="text-gray-400" />
                          <div className="flex-1">
                            <p className="font-medium mb-1">{t.profile.addressField}</p>
                            {editingField === 'address' ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="form-input flex-1"
                                    placeholder={t.profile.addressPlaceholder}
                                    autoFocus
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    className="form-input flex-1"
                                    placeholder={t.profile.cityPlaceholder}
                                  />
                                  <input
                                    type="text"
                                    value={formData.postalCode}
                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                    className="form-input w-32"
                                    placeholder={t.profile.postalCode}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={handleSave}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <Save size={16} />
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-text-secondary">{formData.address}</p>
                                <p className="text-text-secondary text-sm">{formData.city}, {formData.postalCode}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        {editingField !== 'address' && (
                          <button
                            onClick={() => setEditingField('address')}
                            className="text-accent hover:text-accent/70"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6">{t.profile.preferences}</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span>{t.profile.emailNotifications}</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>{t.profile.smsNotifications}</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>{t.profile.marketingCommunications}</span>
                      <input type="checkbox" className="toggle" />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;