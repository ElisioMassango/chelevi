import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PhoneInput from '../components/PhoneInput';
import { validatePhoneNumber } from '../utils/phoneUtils';

const Login: React.FC = () => {
  // Only email login is available
  const [step, setStep] = useState<'login' | 'register' | 'forgot-password' | 'verify-otp' | 'reset-password'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { loginWithEmail, registerWithEmail, forgotPassword, verifyForgotPasswordOtp, resetPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!email || !password) return;

    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (error) {
      // Error handled in context
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile) return;
    
    // Validate phone number
    if (!validatePhoneNumber(mobile)) {
      alert('Por favor, insira um número de telefone válido');
      return;
    }
    
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }

    try {
      await registerWithEmail({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        mobile: mobile
      });
      //navigate('/');
    } catch (error) {
      // Error handled in context
    }
  };


  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!forgotPasswordEmail) return;

    try {
      await forgotPassword(forgotPasswordEmail);
      setStep('verify-otp');
    } catch (error) {
      // Error handled in context
    }
  };

  const handleVerifyForgotPasswordOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!forgotPasswordOtp) return;

    try {
      const result = await verifyForgotPasswordOtp(forgotPasswordEmail, forgotPasswordOtp);
      
      // Check if auto-login occurred
      if (result && result.autoLogin) {
        // User is now logged in, redirect to home or profile
        navigate('/');
      } else {
        // Proceed to reset password step
        setStep('reset-password');
      }
    } catch (error) {
      // Error handled in context
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!newPassword || !confirmNewPassword) return;
    
    if (newPassword !== confirmNewPassword) {
      // Handle password mismatch
      return;
    }

    try {
      await resetPassword(forgotPasswordEmail, newPassword);
      setStep('login');
      // Clear form
      setForgotPasswordEmail('');
      setForgotPasswordOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="login-page min-h-screen bg-primary flex items-center justify-center py-12">
      <div className="container max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/Monogram-bege-BLACK.png" alt="CheLevi" className="w-30 h-20" />
            </Link>
            <h2 className="text-2xl font-bold mb-2">
              {step === 'login' ? 'Bem-vindo de volta' : 
               step === 'register' ? 'Criar Conta' : 
               step === 'forgot-password' ? 'Recuperar Senha' :
               step === 'verify-otp' ? 'Verificar Código' :
               step === 'reset-password' ? 'Nova Senha' :
               'Verificar Código'}
            </h2>
            <p className="text-text-secondary">
              {step === 'login' ? 'Entre na sua conta para continuar' :
               step === 'register' ? 'Crie sua conta para começar' :
               step === 'forgot-password' ? 'Digite seu email para recuperar a senha' :
               step === 'verify-otp' ? 'Digite o código enviado para seu email' :
               step === 'reset-password' ? 'Digite sua nova senha' :
               'Digite o código enviado para seu email'}
            </p>
          </div>


          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Email Login Form */}
          {step === 'login' && (
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
                  onClick={() => setStep('forgot-password')}
                >
                  Esqueceu a senha?
                </button>
                <div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('register')}
                      className="text-sm text-accent hover:underline"
                    >
                      Não tem conta? Criar conta
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Email Register Form */}
          {step === 'register' && (
            <form onSubmit={handleEmailRegister} className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-0">
                <div className="form-group">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Seu nome"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group ">
                  <label className="form-label">Sobrenome</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Seu sobrenome"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group mt-0">
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
                <PhoneInput
                  value={mobile}
                  onChange={setMobile}
                  placeholder="Seu número de telefone"
                  required
                  label="Telefone"
                />
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
                disabled={isLoading || !firstName || !lastName || !email || !password || !confirmPassword || !mobile}
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



          {/* Forgot Password Form */}
          {step === 'forgot-password' && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Digite seu email"
                    className="form-input pl-12"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !forgotPasswordEmail}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Código de Recuperação'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="text-sm text-text-secondary hover:underline"
                >
                  Voltar ao Login
                </button>
              </div>
            </form>
          )}

          {/* Verify Forgot Password OTP */}
          {step === 'verify-otp' && (
            <form onSubmit={handleVerifyForgotPasswordOtp} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Código de Verificação</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={forgotPasswordOtp}
                    onChange={(e) => setForgotPasswordOtp(e.target.value)}
                    placeholder="Digite o código de 6 dígitos"
                    className="form-input pl-12 text-center tracking-widest text-lg font-mono"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Código enviado para {forgotPasswordEmail}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !forgotPasswordOtp}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Verificando...
                  </>
                ) : (
                  'Verificar Código'
                )}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={() => handleForgotPassword({ preventDefault: () => {} } as React.FormEvent)}
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
                  Voltar ao Login
                </button>
              </div>
            </form>
          )}

          {/* Reset Password Form */}
          {step === 'reset-password' && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Nova Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className="form-input pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirmar Nova Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirme sua nova senha"
                    className="form-input pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !newPassword || !confirmNewPassword}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Nova Senha'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="text-sm text-text-secondary hover:underline"
                >
                  Voltar ao Login
                </button>
              </div>
            </form>
          )}

          {/* Demo Instructions */}
      
          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              Ao continuar, você concorda com os nossos{' '}
              <Link to="/privacy-policy" className="text-accent hover:underline">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link to="/privacy-policy" className="text-accent hover:underline">
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