import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const specialities = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist",
  "Neurologist",
  "Psychiatrist",
  "ENT Specialist",
  "Ophthalmologist"
];

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh"
];

function Home() {
  const [topDoctors, setTopDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopDoctors = async () => {
      const response = await fetch(
        "http://localhost:5000/doctor/top4"
      );
      const data = await response.json();
      setTopDoctors(data);
    };

    fetchTopDoctors();
  }, []);

  const handleSearch = () => {
    navigate(
      `/doctors/?search=${search}&city=${city}&speciality=${speciality}`
    );
  };

  return (
    <div style={{ padding: "20px" }}>

      
      <h2>Specialities</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {specialities.map((spec) => (
          <button
            key={spec}
            onClick={() =>
              navigate(`/doctors/?speciality=${spec}`)
            }
          >
            {spec}
          </button>
        ))}
      </div>

      <hr />

      <h2>Search Doctors</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


   <select value={city} onChange={(e)=>setCity(e.target.value)}>
    <option value="">All Cities</option>
    {cities.map((c)=>(
      <option key={c}>{c}</option>
    ))}
   </select>

      <select
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
      >
        <option value="">All Specialities</option>
        {specialities.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <button onClick={handleSearch}>
        Search
      </button>
 <hr />
      
      <h2> Most Searched Doctors</h2>

      {topDoctors && (
        topDoctors.map((doc)=>{
          return (
            <div 
            key={doc.id}
            style={{border:"1px solid gray",padding:"10px",marginBottom:"10px", cursor:"pointer"}}
            onClick={()=>navigate(`/doctor/${doc.id}`)}
            >
              <img src={`http://localhost:5000/uploads/${doc.profile_picture}`} alt="" />
              <h3>{doc.name}</h3>
              <p>{doc.speciality}</p>
              <p>{doc.city}</p>
            </div>
          )
        })
      )}

      <hr />



    </div>
  );
}

export default Home;
