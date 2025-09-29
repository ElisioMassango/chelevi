import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // Mock order data
  const order = {
    id: orderId || 'ORD-001',
    date: '2025-01-20',
    status: 'shipped',
    total: 1250,
    items: [
      {
        id: 1,
        name: 'Edileyne Preta',
        price: 7300,
        quantity: 2,
        image: 'https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1277.PNG'
      },
      {
        id: 2,
        name: 'Edileyne Mel',
        price: 350,
        quantity: 1,
        image: 'https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1278.PNG'
      }
    ],
    deliveryAddress: {
      name: 'Chelevi',
      address: 'Avenida Julius Nyerere, 1234',
      city: 'Maputo',
      phone: '+258 84 123 4567'
    },
    trackingSteps: [
      {
        id: 1,
        title: 'Pedido Confirmado',
        description: 'Seu pedido foi confirmado e está sendo preparado',
        date: '2025-01-20 10:30',
        completed: true,
        icon: <CheckCircle size={20} />
      },
      {
        id: 2,
        title: 'Em Preparação',
        description: 'Seus produtos estão sendo separados e embalados',
        date: '2024-01-20 14:15',
        completed: true,
        icon: <Package size={20} />
      },
      {
        id: 3,
        title: 'Enviado',
        description: 'Seu pedido foi enviado e está a caminho',
        date: '2025-01-21 09:00',
        completed: true,
        current: true,
        icon: <Truck size={20} />
      },
      {
        id: 4,
        title: 'Em Trânsito',
        description: 'Seu pedido está sendo transportado para o endereço de entrega',
        date: 'Estimado: 2025-01-22 16:00',
        completed: false,
        icon: <MapPin size={20} />
      },
      {
        id: 5,
        title: 'Entregue',
        description: 'Seu pedido foi entregue com sucesso',
        date: 'Estimado: 2025-01-23 18:00',
        completed: false,
        icon: <CheckCircle size={20} />
      }
    ]
  };

  return (
    <div className="order-tracking-page py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Rastreamento do Pedido</h1>
          <p className="text-xl text-text-secondary">#{order.id}</p>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Status do Pedido</h2>
              <p className="text-text-secondary">Pedido realizado em {order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Total</p>
              <p className="text-2xl font-bold">MT{order.total}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-secondary transition-all duration-1000"
              style={{ height: `${(order.trackingSteps.filter(step => step.completed).length / order.trackingSteps.length) * 100}%` }}
            ></div>

            <div className="space-y-8">
              {order.trackingSteps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Step Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.completed 
                      ? 'bg-secondary text-text-primary' 
                      : step.current
                      ? 'bg-accent text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        step.completed || step.current ? 'text-text-primary' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`text-sm ${
                        step.completed || step.current ? 'text-text-secondary' : 'text-gray-400'
                      }`}>
                        {step.date}
                      </span>
                    </div>
                    <p className={`${
                      step.completed || step.current ? 'text-text-secondary' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    
                    {step.current && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">
                          🚚 Seu pedido está sendo transportado e chegará em breve!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Itens do Pedido</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-text-secondary">Quantidade: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">MT{item.price * item.quantity}</p>
                    <p className="text-sm text-text-secondary">MT{item.price} cada</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Informações de Entrega</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-secondary mt-1" size={20} />
                <div>
                  <p className="font-semibold">{order.deliveryAddress.name}</p>
                  <p className="text-text-secondary">{order.deliveryAddress.address}</p>
                  <p className="text-text-secondary">{order.deliveryAddress.city}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-secondary" size={20} />
                <p className="text-text-secondary">{order.deliveryAddress.phone}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Precisa de Ajuda?</h4>
              <div className="space-y-2">
                <button className="flex items-center gap-2 text-accent hover:underline">
                  <Phone size={16} />
                  Ligar para Suporte
                </button>
                <button className="flex items-center gap-2 text-accent hover:underline">
                  <Mail size={16} />
                  Enviar Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-8">
          <button className="btn btn-outline mr-4">
            Alterar Endereço de Entrega
          </button>
          <button className="btn btn-secondary">
            Cancelar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;