import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PhoneInput from '../components/PhoneInput';
import { validatePhoneNumber } from '../utils/phoneUtils';
import { useTranslation } from '../contexts/LanguageContext';

const Login: React.FC = () => {
  const t = useTranslation();
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
              {step === 'login' ? t.login.welcomeBack : 
               step === 'register' ? t.login.createAccount : 
               step === 'forgot-password' ? t.login.recoverPassword :
               step === 'verify-otp' ? t.login.verifyCode :
               step === 'reset-password' ? t.login.newPassword :
               t.login.verifyCode}
            </h2>
            <p className="text-text-secondary">
              {step === 'login' ? t.login.welcomeText :
               step === 'register' ? t.login.createAccountText :
               step === 'forgot-password' ? t.login.recoverPasswordText :
               step === 'verify-otp' ? t.login.verifyCodeText :
               step === 'reset-password' ? t.login.newPasswordText :
               t.login.verifyCodeText}
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
                <label className="form-label">{t.auth.email}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.login.emailPlaceholder}
                    className="form-input pl-12"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t.auth.password}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.login.passwordPlaceholder}
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
                    {t.login.entering}
                  </>
                ) : (
                  t.auth.login
                )}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  className="text-sm text-accent hover:underline"
                  onClick={() => setStep('forgot-password')}
                >
                  {t.auth.forgotPassword}
                </button>
                <div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('register')}
                      className="text-sm text-accent hover:underline"
                    >
                      {t.auth.noAccount} {t.auth.createAccount}
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
                <label className="form-label">{t.auth.firstName}</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t.login.firstNamePlaceholder}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group ">
                <label className="form-label">{t.auth.lastName}</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={t.login.lastNamePlaceholder}
                  className="form-input"
                  required
                />
              </div>
              </div>

              <div className="form-group mt-0">
                <label className="form-label">{t.auth.email}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.login.emailPlaceholder}
                    className="form-input pl-12"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <PhoneInput
                  value={mobile}
                  onChange={setMobile}
                  placeholder={t.login.phonePlaceholder}
                  required
                  label={t.auth.phone}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.auth.password}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.login.createPasswordPlaceholder}
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
                <label className="form-label">{t.auth.confirmPassword}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.login.confirmPasswordPlaceholder}
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
                    {t.login.creating}
                  </>
                ) : (
                  t.login.createAccount
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="text-sm text-accent hover:underline"
                >
                  {t.auth.haveAccount} {t.auth.loginHere}
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
              {t.login.termsText}{' '}
              <Link to="/terms" className="text-accent hover:underline">
                {t.login.termsOfService}
              </Link>{' '}
              {t.login.and}{' '}
              <Link to="/privacy-policy" className="text-accent hover:underline">
                {t.login.privacyPolicy}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;