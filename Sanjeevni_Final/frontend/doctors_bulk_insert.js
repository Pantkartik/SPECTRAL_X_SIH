// Bulk insert script for Supabase using JavaScript
// You can run this in your Supabase SQL editor or use Supabase client in Node.js

const doctors = [
  { name: "Dr. Rajiv Gupta", specialization: "General Physician, Diabetologist", fee: 400, hospital: "Gupta Clinic & Diabetes Care", city: "Nabha", address: "Main Bazaar", phone: "+91 98765 43210", rating: 4.3, experience: 15 },
  { name: "Dr. Simranjeet Kaur", specialization: "General Physician, Pediatrician", fee: 300, hospital: "City Care Hospital", city: "Nabha", address: "Model Town Road", phone: "+91 98765 43211", rating: 4.5, experience: 12 },
  { name: "Dr. Alok Jain", specialization: "General Medicine", fee: 500, hospital: "Jain Nursing Home", city: "Nabha", address: "Opposite Bus Stand", phone: "+91 98765 43212", rating: 4.2, experience: 18 },
  { name: "Dr. Harsh Sharma", specialization: "General Physician", fee: 250, hospital: "Sharma Clinic", city: "Nabha", address: "GTB Nagar", phone: "+91 98765 43213", rating: 4.1, experience: 8 },
  { name: "Dr. Priya Mehta", specialization: "General Physician, Cardiologist", fee: 600, hospital: "Prime Heart Institute", city: "Nabha", address: "Civil Lines", phone: "+91 98765 43214", rating: 4.7, experience: 20 },
  { name: "Dr. Sandeep Singh", specialization: "General Physician", fee: 200, hospital: "Singh Medical Centre", city: "Nabha", address: "New Grain Market", phone: "+91 98765 43215", rating: 4, experience: 10 },
  { name: "Dr. Anil Kumar", specialization: "General Medicine, Chest Specialist", fee: 450, hospital: "Life Line Hospital", city: "Nabha", address: "Railway Road", phone: "+91 98765 43216", rating: 4.4, experience: 16 },
  { name: "Dr. Kavita Rani", specialization: "General Physician, Gynecologist", fee: 350, hospital: "Women's Wellness Clinic", city: "Nabha", address: "Urban Estate", phone: "+91 98765 43217", rating: 4.6, experience: 14 },
  { name: "Dr. Vishal Aggarwal", specialization: "General Physician", fee: 300, hospital: "Aggarwal Clinic", city: "Nabha", address: "Bhadson Road", phone: "+91 98765 43218", rating: 4.1, experience: 9 },
  { name: "Dr. Balwinder Singh", specialization: "General Medicine", fee: 400, hospital: "Guru Nanak Medical Centre", city: "Nabha", address: "Patiala Road", phone: "+91 98765 43219", rating: 4.3, experience: 11 },
  // ... add the rest of your doctors here
];

// Example using Supabase JS client
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function bulkInsertDoctors() {
  const { data, error } = await supabase.from('doctors').insert(doctors);
  if (error) {
    console.error('Bulk insert error:', error);
  } else {
    console.log('Inserted doctors:', data);
  }
}

bulkInsertDoctors();