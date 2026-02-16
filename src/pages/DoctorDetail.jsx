import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isTopTen, setIsTopTen] = useState(false);


useEffect(() => {
  const fetchDoctor = async () => {

    if (!sessionStorage.getItem(`viewed_${id}`)) {
      await fetch(
        `http://localhost:5000/doctor/increment/${id}`,{ method: "POST" }
      );

      sessionStorage.setItem(`viewed_${id}`, "true");
    }

    
    const response = await fetch(
      `http://localhost:5000/doctor/detail/${id}`
    );

    const topResponse = await fetch(
  "http://localhost:5000/doctor/top10"
);

const topData = await topResponse.json();

  const ids=topData.map(d=>d.id);
  if(ids.includes(Number(id))){
    setIsTopTen(true);
  }


    const data = await response.json();
    setDoctor(data);
  };

  fetchDoctor();
}, [id]);



  if (!doctor) return <h2>Loading doctor...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Detail</h2>

      <img
        src={`http://localhost:5000/uploads/${doctor.profile_picture}`}
        alt="profile"
        width="120"
      />

      <h3>{doctor.name}</h3>

      <p><b>Gender:</b> {doctor.gender}</p>
      <p><b>Age:</b> {doctor.age}</p>
      <p><b>Email:</b> {doctor.email}</p>
      <p><b>Phone:</b> {doctor.phone}</p>
      <p><b>City:</b> {doctor.city}</p>

      <hr />

      <p><b>Institute:</b> {doctor.institute_name}</p>
      <p><b>Degree:</b> {doctor.degree_name}</p>
      <p><b>Speciality:</b> {doctor.speciality}</p>
      <p><b>Experience:</b> {doctor.years_of_experience} years</p>
      <p><b>Consultation Fee:</b> ₹{doctor.consultation_fee}</p>

      <hr />

      <p><b>Search Count:</b> {doctor.search_count}</p>
      {isTopTen && (
  <p style={{ color: "red", fontWeight: "bold" }}>
     Top 10 Most Searched Doctor
  </p>
)}

    </div>
  );
}

export default DoctorDetail;
