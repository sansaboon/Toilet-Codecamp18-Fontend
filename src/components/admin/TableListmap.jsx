import React, { useEffect, useState } from "react";
import { landmark, removeLandmark, updateLandmark } from "../../api/landmark";
import useAuthStore from "../../store/auth-store";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TableLandMark = () => {
  const [landmarks, setLandmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await landmark(token);
      setLandmarks(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const hdlRemoveLandmark = async (id) => {
    try {
      const resp = await removeLandmark(token, id);
      toast.success(resp.data.message);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const hdlUpdateLandmark = async (e, id) => {
    const body = {
      [e.target.name]: e.target.value
    }
    try {
      const resp = await updateLandmark(token, id, body);
      toast.success(resp.data.message);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  // Pagination Logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = landmarks.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(landmarks.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="space-y-4">
      <table className="w-full table-auto border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">lat</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">lng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">optional</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">quality</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">amenities</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">createdAt</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">updatedAt</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{firstItemIndex + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.lat}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.lng}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select 
                  name="optional"
                  onChange={(e) => hdlUpdateLandmark(e, item.id)}
                  defaultValue={item.optional}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>คนพิการ</option>
                  <option>ฟรี</option>
                  <option>เสียตัง</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select 
                  name="quality"
                  onChange={(e) => hdlUpdateLandmark(e, item.id)}
                  defaultValue={item.quality}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>ดีมาก</option>
                  <option>ดี</option>
                  <option>ไม่ดี</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select 
                  name="amenities"
                  onChange={(e) => hdlUpdateLandmark(e, item.id)}
                  defaultValue={item.amenities}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>กระดาษทิชชี่</option>
                  <option>สายฉีด</option>
                  <option>ทั้งคู่</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.updatedAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => hdlRemoveLandmark(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-gray-700">
            Showing {firstItemIndex + 1} to {Math.min(lastItemIndex, landmarks.length)} of{" "}
            {landmarks.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLandMark;