import React from 'react';
import { ShieldOff, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <ShieldOff className="w-20 h-20 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ไม่ได้รับอนุญาต
        </h1>
        
        <p className="text-gray-600 mb-8">
          ขออภัย คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้ กรุณาเข้าสู่ระบบด้วยบัญชีที่มีสิทธิ์เข้าถึง หรือลองเข้าสู่ระบบใหม่อีกครั้ง
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับไปหน้าก่อนหน้า
          </button>

        </div>
      </div>
    </div>
  );
};

export default Unauthorized;