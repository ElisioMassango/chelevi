import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, MessageSquare, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const { login, register, sendOTP, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!phone) return;

    try {
      await sendOTP(phone);
      setStep('otp');
    } catch (error) {
      // Error is handled in the context
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!otp) return;

    try {
      if (isNewUser) {
        await register(phone, email);
      } else {
        await login(phone, otp);
      }
      navigate('/');
    } catch (error) {
      // Error is handled in the context
    }
  };

  return (
    <div className="login-page min-h-screen bg-primary flex items-center justify-center py-12">
      <div className="container max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img src="https://crm.sparktech.pt/assets/shopfcc/shopfcclogo.png" alt="ShopFCC" className="w-30 h-20" />
            </Link>
            <h2 className="text-xl font-semibold mb-2">
              {step === 'phone' ? 'Bem-vindo de volta' : 'Verifique seu Telefone'}
            </h2>
            <p className="text-text-secondary">
              {step === 'phone' 
                ? 'Digite seu número de telefone para continuar'
                : 'Digite o código de verificação enviado para o seu WhatsApp'
              }
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {step === 'phone' ? (
            /* Phone Number Step */
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Número de Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+258 XX XXX XXXX"
                    className="form-input pl-12"
                    required
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2">
                 Enviaremos um código de verificação para o seu WhatsApp
                </p>
              </div>

              {isNewUser && (
                <div className="form-group">
                  <label className="form-label">Email (Opcional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="form-input"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !phone}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando Código...
                  </>
                ) : (
                  <>
                    <MessageSquare size={20} />
                    Enviar Código de Verificação
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsNewUser(!isNewUser)}
                  className="text-sm text-accent hover:underline"
                >
                    {isNewUser ? 'Já tem uma conta? Entrar' : 'Novo no ShopFCC? Criar conta'}
                </button>
              </div>
            </form>
          ) : (
            /* OTP Verification Step */
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Código de Verificação</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Digite o código de 6 dígitos"
                    className="form-input pl-12 text-center tracking-widest text-lg font-mono"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Código enviado para {phone}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !otp}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Verificando...
                  </>
                ) : (
                  'Verificar & Continuar'
                )}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={() => handlePhoneSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  className="text-sm text-accent hover:underline block"
                  disabled={isLoading}
                >
                  Reenviar Código
                </button>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-sm text-text-secondary hover:underline block"
                >
                  Mudar Número de Telefone
                </button>
              </div>
            </form>
          )}

          {/* Demo Instructions */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-gray-700">Instruções de Demonstração:</h4>
            <p className="text-xs text-gray-600">
              Digite qualquer número de telefone e use <code className="bg-gray-200 px-1 rounded">123456</code> como código de verificação para fazer login.
            </p>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-accent hover:underline">
                Termos de Serviço
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-accent hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;