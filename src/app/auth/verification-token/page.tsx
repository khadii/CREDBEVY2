'use client'

import React, { useState, useRef, useEffect } from 'react';

export default function TwoFactorAuth() {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || '';
    }
    setCode(newCode);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleLogin = async () => {
    const codeString = code.join('');
    if (codeString.length !== 6) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success/failure
    if (codeString === '123456') {
      alert('Login successful!');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
    setIsLoading(false);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    // Simulate resend API call
    console.log('Code resent!');
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
      <div className="w-full bg-[#FAFAFA] min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Two Factor Authentication</h1>
          <p className="text-gray-600">2 Factor Authentication Required. Enter the code sent to your email</p>
        </div>

        {/* Code Input */}
        <div className={`flex justify-center gap-3 mb-8 ${shake ? 'animate-pulse' : ''}`}>
          {code.map((digit, index) => (
            <input
  key={index}
  ref={(el) => { inputRefs.current[index] = el; }}
  type="text"
  inputMode="numeric"
  maxLength={1}
  value={digit}
  onChange={(e) => handleInputChange(index, e.target.value)}
  onKeyDown={(e) => handleKeyDown(index, e)}
  onPaste={handlePaste}
  className={`w-14 h-14 rounded-[8px] focus:outline-none focus:ring-2 text-center text-[40px] font-bold mb-[48px] sm:w-[80px] sm:h-[80px] border-[4px]${
    digit 
      ? "" 
      : 'border-[#156064] focus:ring-[#156064]'
  } ${shake ? 'animate-bounce border-red-400' : ''}`}
  autoComplete="off"
/>

          ))}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!isCodeComplete || isLoading}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
            isCodeComplete && !isLoading
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying...
            </div>
          ) : (
            'Login'
          )}
        </button>

        {/* Resend Code */}
        <div className="text-center mt-6">
          <span className="text-gray-600">Didn&apos;t get the code? </span>
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className={`font-semibold transition-colors duration-200 ${
              resendCooldown > 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800 hover:underline'
            }`}
          >
            {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : 'Resend'}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            💡 <strong>Tip:</strong> You can paste a 6-digit code directly into any input field
          </p>
        </div>
      </div>
    </div>
  );
}