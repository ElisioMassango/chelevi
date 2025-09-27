import React, { useState } from 'react';
import { User, MapPin, Package, Heart, Settings, LogOut, Phone, Mail, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 1250,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-15',
      status: 'shipped',
      total: 850,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'processing',
      total: 1450,
      items: 4
    }
  ];

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
                <h2 className="font-semibold text-lg">{user?.name || 'User'}</h2>
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
                  Overview
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
                  My Orders
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
                  Wishlist ({wishlistItems.length})
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
                  Addresses
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
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-error hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Profile Overview</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-text-secondary text-sm">Total Orders</p>
                        <p className="text-2xl font-bold">{orders.length}</p>
                      </div>
                      <Package size={32} className="text-secondary" />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-text-secondary text-sm">Total Spent</p>
                        <p className="text-2xl font-bold">MT{orders.reduce((sum, order) => sum + order.total, 0)}</p>
                      </div>
                      <div className="text-2xl">💳</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-text-secondary text-sm">Wishlist Items</p>
                        <p className="text-2xl font-bold">{wishlistItems.length}</p>
                      </div>
                      <Heart size={32} className="text-secondary" />
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-text-secondary">{order.items} items • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">MT{order.total}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">My Orders</h1>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-lg border">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <p className="text-text-secondary">Placed on {order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-text-secondary">{order.items} items</p>
                          <p className="font-bold text-lg">MT{order.total}</p>
                        </div>
                        <div className="space-x-2">
                          <button className="btn btn-outline btn-sm">View Details</button>
                          {order.status === 'delivered' && (
                            <button className="btn btn-secondary btn-sm">Reorder</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                
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
                                Add to Cart
                              </button>
                              <button className="btn btn-outline btn-sm">
                                Remove
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
                    <p className="text-text-secondary">Your wishlist is empty</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Saved Addresses</h1>
                  <button className="btn btn-primary">Add New Address</button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border text-center">
                  <MapPin size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-text-secondary">No saved addresses yet</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Account Settings</h1>
                
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone size={20} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Phone Number</p>
                          <p className="text-text-secondary">{user?.phone}</p>
                        </div>
                      </div>
                      <button className="text-accent hover:underline">
                        <Edit size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail size={20} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Email Address</p>
                          <p className="text-text-secondary">{user?.email || 'Not provided'}</p>
                        </div>
                      </div>
                      <button className="text-accent hover:underline">
                        <Edit size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <User size={20} className="text-gray-400" />
                        <div>
                          <p className="font-medium">Full Name</p>
                          <p className="text-text-secondary">{user?.name || 'Not provided'}</p>
                        </div>
                      </div>
                      <button className="text-accent hover:underline">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6">Preferences</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span>Email notifications</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>SMS notifications</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Marketing communications</span>
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