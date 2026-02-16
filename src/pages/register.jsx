import { useDispatch, useSelector } from "react-redux";
import { setDoctorId, nextStep, reset } from "../store/doctorSlice";
import { useState } from "react";


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

const degrees = [
  "MBBS",
  "MD",
  "MS",
  "DM",
  "MCh",
  "DNB",
  "BAMS",
  "BHMS"
];


function Register() {
 const dispatch=useDispatch();
 const {doctorId,step}=useSelector((state)=>state.registration)

  const [form1, setForm1] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    city: "",
    profilePic: null
  });

  const [form2, setForm2] = useState({
    institute: "",
    degree: "",
    speciality: "",
    yoe: "",
    consultation_fee: 0
  });


  const handleStep1 = async () => {
    if (!form1.profilePic) {
      alert("Profile picture required");
      return;
    }

    const formData = new FormData();
    Object.keys(form1).forEach((key) => {
      formData.append(key, form1[key]);
    });

    const res = await fetch(
      "http://localhost:5000/doctor/step1",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    if (res.ok) {
      dispatch(setDoctorId(data.doctorId));
      dispatch(nextStep());
    } else {
      alert(data.error);
    }
  };


  const handleStep2 = async () => {
    if (!doctorId) {
      alert("Step 1 not completed");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/doctor/step2/${doctorId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form2)
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Registration completed");
      dispatch(reset());
    } else {
      alert(data.error);
    }
  };


  return (
    <div style={{ width: "400px", margin: "40px auto" }}>

      {step === 1 && (
        <>
        <h2>Step 1 - Personal Info</h2>

        <input type="text"placeholder="Name" onChange={(e) =>
        setForm1({ ...form1, name: e.target.value })}
        />

    <select onChange={(e) => setForm1({ ...form1, gender: e.target.value }) }>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
    </select>

          <input
            type="number"
            placeholder="Age"
            onChange={(e) =>
              setForm1({ ...form1, age: e.target.value })
            }
          />

          <input
            type="email"
            required
            
            placeholder="Email"
    onChange={(e) =>
    setForm1({ ...form1, email: e.target.value })
  }
  onBlur={(e) => {
    const value = e.target.value;
    if (!value.includes("@") || !value.includes(".")) {
      alert("Invalid email");
    }
  }}     />

      <input
            type="text" placeholder="Phone" onChange={(e) =>setForm1({ ...form1, phone: e.target.value })}
        />

          <select
            onChange={(e) => setForm1({ ...form1, city: e.target.value })
            }
          >
      <option value="">Select City</option>
            {cities.map((city) => (<option key={city} value={city}> {city}</option>))}
  </select>

     <input
            type="file"
            onChange={(e) => setForm1({...form1,profilePic: e.target.files[0] }) }/>

          <button onClick={handleStep1}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
        <h2>Step 2 - Professional Info</h2>
        <input
        type="text"
            placeholder="Institute"
            onChange={(e) =>
              setForm2({ ...form2, institute: e.target.value })
            }
    />

     <select onChange={(e)=>setForm2({...form2,degree:e.target.value})}>
          <option value="">select degree</option>
          {degrees.map((degree)=>(
            <option value={degree} key={degree}>{degree}</option>
          ))}
  </select>

      <select onChange={(e) => setForm2({ ...form2, speciality: e.target.value })}>
      <option value="">Select Speciality</option>
            {specialities.map((spec) => ( <option key={spec} value={spec}> {spec}
      </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Years of Experience"
            onChange={(e) =>
              setForm2({ ...form2, yoe: e.target.value })
            }
          />

   <input
      type="number"  placeholder="Consultation Fee" onChange={(e) => setForm2({ ...form2, consultation_fee: e.target.value})  }
          />

          <button onClick={handleStep2}>
            Complete Registration
          </button>
        </>
      )}
    </div>
  );
}

export default Register;
