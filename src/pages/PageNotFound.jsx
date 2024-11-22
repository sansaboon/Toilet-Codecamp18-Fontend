import React from 'react';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileQuestion className="w-24 h-24 text-blue-500" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ไม่พบหน้าที่คุณต้องการ
        </h2>

        <p className="text-gray-600 mb-8">
          ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา อาจเป็นไปได้ว่าลิงก์ไม่ถูกต้องหรือหน้านี้ถูกย้ายไปที่อื่น
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับไปหน้าก่อนหน้า
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            กลับหน้าหลัก
          </button>
        </div>

        <div className="mt-12 text-gray-400">
          <p>รหัสข้อผิดพลาด: 404 Page Not Found</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;