import React, { useState } from 'react';
import LocationSelector from '../components/LocationSelector';

const LocationDemo: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    country: string;
    state: string;
    city: string;
  }>({
    country: '',
    state: '',
    city: '',
  });

  const handleLocationChange = (location: {
    country: string;
    state: string;
    city: string;
  }) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Demonstração do Seletor de Localização
          </h1>
          
          <div className="space-y-6">
            <LocationSelector
              onLocationChange={handleLocationChange}
              showLabels={true}
              required={true}
            />
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Localização Selecionada:
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>País:</strong> {selectedLocation.country || 'Nenhum selecionado'}</p>
                <p><strong>Estado:</strong> {selectedLocation.state || 'Nenhum selecionado'}</p>
                <p><strong>Cidade:</strong> {selectedLocation.city || 'Nenhum selecionado'}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Como usar:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Selecione um país primeiro</li>
                <li>• Depois selecione um estado/província</li>
                <li>• Por fim, selecione uma cidade</li>
                <li>• Os dados são carregados dinamicamente da API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDemo;
