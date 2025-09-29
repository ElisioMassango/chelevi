import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAddresses } from '../hooks/useApi';
import { Address } from '../services/api';

interface AddressManagerProps {
  customerId: string;
}

const AddressManager: React.FC<AddressManagerProps> = ({ customerId }) => {
  const {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    addingAddress,
    updatingAddress,
    deletingAddress,
  } = useAddresses(customerId);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    country: '1',
    state: '1',
    city: '1',
    postcode: '',
    default_address: '0',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      address: '',
      country: '1',
      state: '1',
      city: '1',
      postcode: '',
      default_address: '0',
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id.toString(), formData);
      } else {
        await addAddress(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      address: address.address,
      country: address.country_id.toString(),
      state: address.state_id.toString(),
      city: address.city_id.toString(),
      postcode: address.postcode.toString(),
      default_address: address.default_address.toString(),
    });
    setShowAddForm(true);
  };

  const handleDelete = async (addressId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este endereço?')) {
      await deleteAddress(addressId.toString());
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erro ao carregar endereços: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Endereços Salvos</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Adicionar Endereço
        </button>
      </div>

      {/* Address Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Título do Endereço</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="form-input"
                  placeholder="Casa, Trabalho, etc."
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Código Postal</label>
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  className="form-input"
                  placeholder="1100"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Endereço Completo</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="form-textarea"
                placeholder="Rua, número, bairro..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">País</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="form-select"
                >
                  <option value="1">Moçambique</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Província</label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="form-select"
                >
                  <option value="1">Maputo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Cidade</label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="form-select"
                >
                  <option value="1">Maputo</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.default_address === '1'}
                  onChange={(e) => handleInputChange('default_address', e.target.checked ? '1' : '0')}
                  className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                />
                <span className="text-sm">Definir como endereço padrão</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={addingAddress || updatingAddress}
                className="btn btn-primary flex items-center gap-2"
              >
                {(addingAddress || updatingAddress) ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Salvar
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-outline flex items-center gap-2"
              >
                <X size={16} />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      <div className="space-y-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className="bg-white p-6 rounded-lg border">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin className="text-secondary mt-1" size={20} />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{address.title}</h3>
                      {address.default_address === 1 && (
                        <span className="text-xs bg-secondary text-text-primary px-2 py-1 rounded-full">
                          Padrão
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary mb-1">{address.address}</p>
                    <p className="text-sm text-text-secondary">
                      {address.city_name}, {address.state_name}, {address.country_name} - {address.postcode}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-accent hover:text-accent/70 p-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    disabled={deletingAddress}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MapPin size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-text-secondary">Nenhum endereço salvo ainda</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary mt-4"
            >
              Adicionar Primeiro Endereço
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManager;