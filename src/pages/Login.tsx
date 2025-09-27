import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, MessageSquare, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'whatsapp'>('email');
  const [step, setStep] = useState<'login' | 'register' | 'otp'>('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register, sendOTP, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!email || !password) return;

    try {
      // Simulate email login
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/');
    } catch (error) {
      // Error handled in context
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!email || !password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }

    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      // Error handled in context
    }
  };

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
      await login(phone, otp);
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
            <h2 className="text-2xl font-bold mb-2">
              {step === 'login' ? 'Bem-vindo de volta' : 
               step === 'register' ? 'Criar Conta' : 
               'Verificar Código'}
            </h2>
            <p className="text-text-secondary">
              {step === 'login' ? 'Entre na sua conta para continuar' :
               step === 'register' ? 'Crie sua conta para começar' :
               'Digite o código enviado para seu WhatsApp'}
            </p>
          </div>

          {/* Login Method Toggle */}
          {(step === 'login' || step === 'register') && (
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === 'email' 
                    ? 'bg-white text-text-primary shadow-sm' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Mail size={16} className="inline mr-2" />
                Email
              </button>
              <button
                onClick={() => setLoginMethod('whatsapp')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === 'whatsapp' 
                    ? 'bg-white text-text-primary shadow-sm' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <MessageSquare size={16} className="inline mr-2" />
                WhatsApp
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Email Login Form */}
          {step === 'login' && loginMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="form-input pl-12"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    className="form-input pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  className="text-sm text-accent hover:underline"
                >
                  Esqueceu a senha?
                </button>
                <div>
                  <button
                    type="button"
                    onClick={() => setStep('register')}
                    className="text-sm text-accent hover:underline"
                  >
                    Não tem conta? Criar conta
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Email Register Form */}
          {step === 'register' && loginMethod === 'email' && (
            <form onSubmit={handleEmailRegister} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="form-input pl-12"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha"
                    className="form-input pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    className="form-input pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email || !password || !confirmPassword}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Criando conta...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="text-sm text-accent hover:underline"
                >
                  Já tem conta? Entrar
                </button>
              </div>
            </form>
          )}

          {/* WhatsApp Login/Register */}
          {(step === 'login' || step === 'register') && loginMethod === 'whatsapp' && (
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
            </form>
          )}

          {/* OTP Verification */}
          {step === 'otp' && (
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
                  onClick={() => setStep('login')}
                  className="text-sm text-text-secondary hover:underline block"
                >
                  Voltar
                </button>
              </div>
            </form>
          )}

          {/* Demo Instructions */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-gray-700">Instruções de Demonstração:</h4>
            <p className="text-xs text-gray-600">
              {loginMethod === 'email' 
                ? 'Use qualquer email e senha para fazer login de demonstração.'
                : 'Digite qualquer número de telefone e use 123456 como código de verificação.'
              }
            </p>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              Ao continuar, você concorda com nossos{' '}
              <Link to="/terms" className="text-accent hover:underline">
                Termos de Serviço
              </Link>{' '}
              e{' '}
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