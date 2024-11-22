import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  LayerGroup,
  useMapEvent,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import { MapPin, Search, PlusCircle } from "lucide-react"; // Import the PlusCircle icon
import "leaflet/dist/leaflet.css";
import axios from "axios"; //เป็นไลบรารีสำหรับส่งคำขอ HTTP
import * as L from "leaflet"; //ใช้เพื่อจัดการข้อมูลแผนที่
import useAuthStore from "../store/auth-store"; //เป็นการเรียกข้อมูลจาก state ที่เก็บโทเค็นการรับรองตัวตน

// Define the icon for the toilet marker
const toiletIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/8064/8064840.png",
  iconSize: [24, 24],
});

const MapContent = () => {
  const [position, setPosition] = useState(null); //เก็บตำแหน่งที่ผู้ใช้คลิกบนแผนที่
  const [landmark, setLandmark] = useState([]);   //เก็บข้อมูลห้องน้ำที่ดึงมาจาก API
  const token = useAuthStore(state => state.token); // ดึงข้อมูล token จาก authstore โดยเรียกเป็น call back ที่ใช้เพื่อเลือกค่าบางส่วนจาก Zustand store. เราจะได้ token จาก state
  const [myposition, setMyPosition] = useState(null); //เก็บตำแหน่งปัจจุบันของผู้ใช้
  const [isPopupVisible, setIsPopupVisible] = useState(false); //กำหนดการแสดงผลป๊อบอัพ
const [restroomData, setRestroomData] = useState([]); //เก็บข้อมูลห้องน้ำที่อยู่ใกล้ผู้ใช้ (ใช้ในฟังก์ชันค้นหา)


  const [form, setForm] = useState({ // เก็บข้อมูลจากฟอร์มสำหรับเพิ่มห้องน้ำใหม่
    title: "",
    lat: "",
    lng: "",
    quality: "",
    amenities: "",
    optional: "",
    hasPaper: false,
    hasSpray: false,
    hasSoap: false,
  });

  const [popupVisible, setPopupVisible] = useState(false); // State for controlling the popup visibility //เก็บสถานะว่าฟอร์มเพิ่มห้องน้ำจะปรากฏขึ้นหรือไม่

   
  useEffect(() => {    //ใช้ useEffect เพื่อเรียกข้อมูลห้องน้ำเมื่อ component ถูก mount
    getDataLandmark(); // ฟังก์ชัน getDataLandmark ใช้ axios เพื่อส่งคำขอไปยัง API และบันทึกข้อมูลที่ได้ใน state landmark
  }, []);

  // Lock and unlock body scroll based on popup visibility
  useEffect(() => {
    if (popupVisible) {
      document.body.style.overflow = "hidden"; // Lock scrolling
    } else {
      document.body.style.overflow = "auto"; // Unlock scrolling
    }
  }, [popupVisible]);

  const getDataLandmark = async () => {

    try {
 
        const resp = await axios.get("http://localhost:5000/api/allLandmark");  //ฟังก์ชัน getDataLandmark ดึงข้อมูลจาก API
        console.log(resp.data);   
        setLandmark(resp.data); //เมื่อได้รับข้อมูล จะอัพเดต state (setLandmark) ด้วยข้อมูลที่ได้จาก API.


    } catch (err) {
      console.log(err);
    }
  };

  const hdlOnchange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === "checkbox") {
      setForm({
        ...form,
        [name]: checked, // ใช้ค่าของ checked สำหรับ checkbox
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const LocationMarker = () => {   //LocationMarker: เมื่อผู้ใช้คลิกบนแผนที่จะทำการบันทึกตำแหน่งใน position และปรับข้อมูลในฟอร์ม (lat, lng) พร้อมซูมไปยังตำแหน่งนั้น
    const map = useMapEvent({      
      click: (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 13);
        setForm({
          ...form,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
        setPopupVisible(true); // Show popup when the map is clicked
      },
    });

   
   
    return position === null ? null : <Marker position={position}></Marker>;
  };


 

  const MyLocation = ({ myposition, setMyPosition }) => {  // //MyLocation: ใช้ข้อมูลตำแหน่งปัจจุบันของผู้ใช้จาก navigator.geolocation เพื่อตั้งค่า myposition และแสดงมาร์กเกอร์ตำแหน่งของผู้ใช้บนแผนที่
    const map = useMap();
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            if (!myposition || myposition[0] !== latitude || myposition[1] !== longitude) {
              setMyPosition([latitude, longitude]);
              map.flyTo([latitude, longitude], 18, {
                duration: 2, // ระยะเวลาของการซูมเข้า (หน่วยเป็นวินาที)
              });
            }
          },
          (err) => {
            console.error(err);
            if (!myposition) {
              setMyPosition([51.505, -0.09]);
              map.flyTo([51.505, -0.09], 15, {
                duration: 2, // ระยะเวลาของการซูมเข้า (หน่วยเป็นวินาที)
              });
            }
          }
        );
      } else {
        if (!myposition) {
          setMyPosition([51.505, -0.09]);
          map.flyTo([51.505, -0.09], 15, {
            duration: 2, // ระยะเวลาของการซูมเข้า (หน่วยเป็นวินาที)
          });
        }
      }
    }, [map, myposition, setMyPosition]);
  
    return myposition ? <Marker position={myposition}></Marker> : null;
  };
  


  const hdlSubmit = async (e) => {   
    e.preventDefault();  // ส่งข้อมูลห้องน้ำใหม่ไปยัง API หรือเซิร์ฟเวอร์
    console.log(form);
    try {
      const resp = await axios.post("http://localhost:5000/api/landmark", form, {headers: {Authorization:`Bearer ${token}`}});
      console.log(resp);
      // Fetch new data after submission
      getDataLandmark();
      setPopupVisible(false); // Close the popup after submission
    } catch (err) {
      console.log(err);
    }
  };

  
  const hdlSearch = async (e) => {    //ฟังก์ชัน hdlSearch: ค้นหาห้องน้ำที่อยู่ในระยะ 500 เมตรจากตำแหน่งของผู้ใช้โดยใช้ข้อมูลจาก landmark และ myposition
    console.log('landmark', landmark);  
    console.log('position', myposition);
  
    if (myposition) {
      const nearby = landmark.filter((restroom) => {
        const latLng = { lat: restroom.lat, lng: restroom.lng }; //หลังจากกรองห้องน้ำที่อยู่ในระยะ 500 เมตรจากผู้ใช้แล้ว ข้อมูลห้องน้ำจะถูกเก็บไว้ในตัวแปร restroomData.
        const distance = L.latLng(latLng).distanceTo(L.latLng(myposition));
        return distance <= 500; // Distance within 500 meters   //ฟังก์ชัน mapDistance ใช้สูตรคำนวณระยะทางระหว่างสองจุดบนโลกโดยอิงจากพิกัด (latitude, longitude) 
      });                                                        //ซึ่งใช้สูตร Haversine Formula. สูตรนี้ใช้เพื่อคำนวณระยะทางโดยคำนึงถึงความโค้งของโลก:
      
      console.log('nearby', nearby);
      setRestroomData(nearby); // Store the nearby restroom data
      setIsPopupVisible(true); // Show the popup   //แสดงผลลัพธ์ห้องน้ำที่พบใน popup ด้วยการตั้งค่า setIsPopupVisible(true)
    } else {
      console.log('Position not available');
    }
  
    console.log('Search');
  };


  
  return (
    <div
      className="flex flex-col gap-4 bg-white rounded-sm border border-gray-200 shadow-md"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Fixed Navbar */}
      {/* <div className="bg-gray-800 text-white p-4  w-full z-10">
                <h1 className="text-lg font-bold">My Map</h1>
            </div> */}

      {/* Map Section with Full Height */}
      <div style={{ paddingTop: "60px", height: "calc(100vh - 150px)" }}>
        <MapContainer
          center={[13, 100]}
          zoom={6}
          className="relative z-0"
          style={{ height: "100%" }}
        >
          <LayersControl>
            <LayersControl.BaseLayer name="แผนที่ 1" checked>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="แผนที่ 2">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay name="Landmark" checked>
        <LayerGroup>  
          {landmark.map((item, index) => (
              <Marker
                key={index}
                icon={toiletIcon}
                position={[item.lat, item.lng]}
              >
                <Popup className="bg-white rounded-lg shadow-md p-4 max-w-sm">
  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
  <p className="mb-1"><span className="font-medium">คุณภาพห้องน้ำ:</span> {item.optional}</p>
  <p className="mb-3"><span className="font-medium">อุปกรณ์อำนวยความสะดวก:</span> {item.amenities}</p>
  <p className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">กดคลิกเพื่อเลือกรูปแบบการเดินทาง</p>
  <div className="flex space-x-2">
    <button
      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}&travelmode=driving`, "_blank")}
      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
    >
      ขับรถ
    </button>
    <button
      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}&travelmode=walking`, "_blank")}
      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
    >
      เดิน
    </button>
    <button
      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}&travelmode=transit`, "_blank")}
      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
    >
      รถสาธารณะ
    </button>
  </div>
</Popup>
              </Marker>
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
          </LayersControl>
          <MyLocation myposition={myposition} setMyPosition={setMyPosition}/>
          <LocationMarker />
        </MapContainer>
      </div>

      {/*Bottom Controls*/}
      <div className="bg-white p-4 rounded-lg shadow-md relative z-[10]">
  <div className="flex justify-center items-center space-x-4">
    <button 
      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      aria-label="Pin Location"
    >
      <MapPin size={24} />
    </button>
    <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
  onClick={hdlSearch}
  aria-label="Search"
>
  <Search size={24} />
</button>

{/* ป๊อบอัพข้อมูลห้องน้ำ */}
{isPopupVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">ห้องน้ำที่ใกล้เคียง</h2>
        <button
          onClick={() => setIsPopupVisible(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none px-2 py-1 rounded"
        >
          ปิด
        </button>
      </div>
      <div className="space-y-4">
        {restroomData.map((restroom, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg mb-2">{restroom.title}</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <p className="text-sm">ประเภท: {restroom.optional}</p>
              <p className="text-sm">คุณภาพ: {restroom.quality}</p>
              <p className="text-sm col-span-2">อุปกรณ์: {restroom.amenities}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${restroom.lat},${restroom.lng}&travelmode=driving`, "_blank")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                ขับรถ
              </button>
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${restroom.lat},${restroom.lng}&travelmode=walking`, "_blank")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                เดิน
              </button>
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${restroom.lat},${restroom.lng}&travelmode=transit`, "_blank")}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                รถสาธารณะ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    
    {token && (
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setPopupVisible(true)}
        aria-label="Add New Location"
      >
        <PlusCircle size={24} />
      </button>
    )}
  </div>

        {/* ฟอร์มสำหรับเพิ่มข้อมูลห้องน้ำ */}
{popupVisible && token && (    //ฟอร์มสำหรับการเพิ่มห้องน้ำใหม่จะถูกอัปเดตเมื่อผู้ใช้คลิกบนแผนที่ โดยมีการตั้งค่าตำแหน่ง (lat, lng) ที่ผู้ใช้คลิก:
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    onClick={() => setPopupVisible(false)}
  >
    <div
      className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-md mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        เพิ่มข้อมูลห้องน้ำ
      </h2>
      <form onSubmit={hdlSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            ชื่อสถานที่:
          </label>
          <input
            name="title"
            onChange={hdlOnchange}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรอกชื่อสถานที่"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ละติจูด: <span className="font-semibold">{position?.lat.toFixed(4)}</span>
            </label>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ลองจิจูด: <span className="font-semibold">{position?.lng.toFixed(4)}</span>
            </label>
          </div>
        </div>
        <div className="space-y-4">
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">ประเภทห้องน้ำ:</legend>
            <div className="space-y-2">
              {['คนพิการ', 'ฟรี', 'เสียตัง'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="optional"
                    value={type}
                    onChange={hdlOnchange}
                    className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">คุณภาพห้องน้ำ:</legend>
            <div className="space-y-2">
              {['ดีมาก', 'ดี', 'ไม่ดี'].map((quality) => (
                <label key={quality} className="flex items-center">
                  <input
                    type="radio"
                    name="quality"
                    value={quality}
                    onChange={hdlOnchange}
                    className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{quality}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">อุปกรณ์อำนวยความสะดวก:</legend>
            <div className="space-y-2">
              {['กระดาษทิชชู่', 'สายฉีด', 'ทั้งคู่'].map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="radio"
                    name="amenities"
                    value={amenity}
                    onChange={hdlOnchange}
                    className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="flex justify-center pt-4">
          <button className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out">
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </div>
  </div>
        )}

<div className="text-center font-bold mb-3 text-gray-700">เลือกประเภทของห้องน้ำมี 3 แบบท่านสามารถเลือกได้เมื่อกดค้นหาห้องน้ำ</div>
  <div className="flex justify-center space-x-2">
    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm">
      คนพิการ
    </button>
    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm">
      ฟรี
    </button>
    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-sm">
      เสียตัง
    </button>

        {/* <button  
          className={`${showAccessible ? 'bg-purple-600' : 'bg-purple-300'} hover:bg-purple-600 text-white px-4 py-2 rounded-lg`}
          // onClick={() => toggleMarkers("Accessible")}
        >
          Accessible
        </button>
        <button 
          className={`${showFree ? 'bg-green-600' : 'bg-green-300'} hover:bg-green-600 text-white px-4 py-2 rounded-lg`}
          // onClick={() => toggleMarkers("Free")}
        >
          Free
        </button>
        <button 
          className={`${showPay ? 'bg-yellow-600' : 'bg-yellow-300'} hover:bg-yellow-600 text-white px-4 py-2 rounded-lg`}
          // onClick={() => toggleMarkers("Pay")}
        >
          Pay
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default MapContent;
