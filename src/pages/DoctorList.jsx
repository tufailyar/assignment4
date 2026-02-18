import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSearchParams } from "react-router-dom";


/*

const [params]=useSearchParams();
const searchUrl=params.get("search") || "";
const cityUrl=params.get("city") || "";
const specialityUrl=params.get("speciality") || "";

const [search,setSearch]=useState(searchUrl);
const [city,setCity]=useState(cityUrl);
const [speciality,setSpeciality]=useState(speciality);

const [doctors,setDoctors]=useState([]);
const [page,setPage]=useState(1);
const [hasmore,setHasmore]=useState(true);
const [loading,setLoading]=useState(false);

useEffect(()=>{
setDoctors([]);
setPage(1);
setHasmore(true);
setSearch(searchUrl);
setCity(cityUrl);
setSpeciality(speciality)
 },[]);


 useEffect(()=>{
  const fetchDoctors=async ()=>{
  setLoading(true);
  try{
  const response= await fetch(`http:localhost:5000/doctor/list?page=${page}&search=${search}&city=${city}&speciality=${speciality}`
  const data=response.json();
  if(response.ok){
    if(data.length==0) setHasmore(fasle);
      setDoctors((prev)=>[...prev,...data]);
  }
}
      catch(error){
      console.log(error;)
      }
}
  
      fetchDoctors();
  },[page,search,city,speciality])


  useEffect(()=>{
     let timeout;
    const handleScroll=()=>{
      if(timout) return;
      
      timeout=setTimeout(()=>{
       if(window.innerHeight+window.scrollY>=document.body.offsetHeight-50){
      setPage((prev)=>prev+1);
      }
      timeout=null;
        },400)
      }
    

    window.addEventListner("scroll",handleScroll);
    },[])

*/



function DoctorList() {

  const [params] = useSearchParams();

const urlSearch = params.get("search") || "";
const urlCity = params.get("city") || "";
const urlSpeciality = params.get("speciality") || "";


const [search, setSearch] = useState(urlSearch);
const [city, setCity] = useState(urlCity);
const [speciality, setSpeciality] = useState(urlSpeciality);


    const navigate=useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);



useEffect(() => {
  setDoctors([]);
  setPage(1);
  setHasMore(true);
  setSearch(urlSearch);
  setCity(urlCity);
  setSpeciality(urlSpeciality);
}, [urlSearch, urlCity, urlSpeciality]);





 useEffect(() => {
   const fetchDoctors = async () => {


    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/doctor/list?page=${page}&search=${search}&city=${city}&speciality=${speciality}`
      );



      const data = await response.json();

      if (response.ok) {
        if (data.length === 0) {
          setHasMore(false);} 
          else {
          setDoctors((prev) => [...prev, ...data]);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);};

  fetchDoctors();
}, [page, search, city, speciality]);



useEffect(()=>{

 let timeout;
const handleScroll=()=>{

  if(timeout) return;
        console.log("hello from scroll");


  timeout=setTimeout(()=>{
     if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50 ) {
        setPage((prev) => prev + 1);
      }
        timeout=null;
    },500);
  };
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);

},[]);




  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Listing (Infinite Scroll)</h2>

      <div style={{ marginBottom: "20px" }}>

 <input
 type="text"
 value={search}
 placeholder="search by name"
 onChange={(e)=>{
  setDoctors([]);
  setSearch(e.target.value);
  setHasMore(true);
  setPage(1);
 }}

 >
 </input>

  <select  value={city}
  onChange={(e)=>{
    setCity(e.target.value);
    setDoctors([]);
    setPage(1);
    setHasMore(true);
  }}
  >
    <option value="">All Cities</option>
    <option>Mumbai</option>
    <option>Delhi</option>
    <option>Bangalore</option>
    <option>Hyderabad</option>
    <option>Chennai</option>
    <option>Pune</option>
    <option>Kolkata</option>
    <option>Ahmedabad</option>
    <option>Jaipur</option>
    <option>Chandigarh</option>
  </select>

  <select
    value={speciality}
    onChange={(e) => {
      setDoctors([]);
      setPage(1);
      setSpeciality(e.target.value);
      setHasMore(true);

    }}
  >
    <option value="">All Specialities</option>
    <option>General Physician</option>
    <option>Cardiologist</option>
    <option>Dermatologist</option>
    <option>Pediatrician</option>
    <option>Orthopedic</option>
    <option>Gynecologist</option>
    <option>Neurologist</option>
    <option>Psychiatrist</option>
    <option>ENT Specialist</option>
    <option>Ophthalmologist</option>
  </select>

</div>

{
  doctors.map((D)=>(
    <div  key={D.id} onClick={()=>navigate(`/doctor/${D.id}`)} style={{border:"1px solid black",cursor:"pointer",  margin:"10px", padding:"5px", display:"flex", gap:"20px"}}>
      <img src={`http://localhost:5000/uploads/${D.profile_picture}`} width={140} alt="" />
      <div>
        <h2>{D.name}</h2>
        <p>name: {D.speciality}</p>
        <p>city: {D.city}</p>
        <p>years of experience: {D.years_of_experience}</p>
      </div>

    </div>
  ))
}

    {loading && <p>Loading more doctors...</p>}
    {!hasMore && <p>No more doctors available</p>}
    </div>
  );
}

export default DoctorList;
