"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pill, Store } from "lucide-react";

const pharmacies = [
  { name: "Prem Medical Store", location: "Bhawra Bazar, Nabha", phone: "09417560065", amenities: "Prescription & OTC medicines, cough syrups, paracetamol, personal care products; Home delivery, in‑store shopping, pickup", area: "Nabha" },
  { name: "Raja Medical Hall", location: "Alohran Gate, Ghas Mandi Rd, Nabha", phone: "93432343434", amenities: "Comprehensive stock of medicines; Home delivery; Discount pricing", area: "Nabha" },
  { name: "Mittal Medicos", location: "Cinema Rd, Guru Nanak Pura, Nabha", phone: "9234343423", amenities: "Allopathic medicines, OTC health products; Veterinary medicines", area: "Nabha" },
  { name: "Mannat Medicos", location: "Laxman Nagar, Nabha", phone: "93423423423", amenities: "General medicines, cough/cold remedies; Quick service", area: "Nabha" },
  { name: "Shakti Medical Agency", location: "Guru Nanak Pura, Nabha", phone: "9234343423", amenities: "All major medicines, health products; Same‑day delivery", area: "Nabha" },
  { name: "Ashoka Medicos", location: "Near Ghorewala Gurudwara, Nabha", phone: "9815178224", amenities: "Allopathic medicines; Quick dispensing", area: "Nabha" },
  { name: "Kirat Medical Hall", location: "Mehs Gate Rd, Nabha", phone: "9234234433", amenities: "Full spectrum of medicines; Serves Mehs Gate patients", area: "Nabha" },
  { name: "Bansal Medicos", location: "Civil Hospital Rd, Nabha", phone: "9234959495", amenities: "Medicines for emergency & routine needs; Near hospital", area: "Nabha" },
  { name: "Channo Health Care", location: "Channo village (near Nabha)", phone: "9347574884", amenities: "Essential medicines for rural community; Clinic‑cum‑pharmacy", area: "Channo" },
  { name: "Kohinoor Medical Hall", location: "Alohran Gate, Ghas Mandi Rd, Nabha", phone: "948584848", amenities: "General chemist; Helpful service", area: "Nabha" },
  { name: "Royal Medical Store", location: "Laxman Nagar, Nabha", phone: "9347578484", amenities: "Prescription drugs, OTC medicines, first‑aid products", area: "Nabha" },
  { name: "J J Kheti Sewa Center", location: "Nabha", phone: "9348757745", amenities: "General medical store, Agro‑based supplies", area: "Nabha" },
  { name: "Jatinder Medical Hall", location: "Opp. Bedi Sweets, Mehs Gate Rd, Nabha", phone: "3945448584", amenities: "Extended hours, likely home delivery", area: "Nabha" },
  { name: "Kailash Medical Store", location: "Nabha", phone: "9349885845", amenities: "Allopathic medicines, common OTC drugs", area: "Nabha" },
  { name: "Munish Med Hall", location: "Nabha", phone: "934875745", amenities: "Chemist, prescription & OTC medicines", area: "Nabha" },
  { name: "Saraswati Enterprises", location: "Nabha", phone: "993489588", amenities: "Pharma distributor, common medicines", area: "Nabha" },
  { name: "Dhir Medical Hall", location: "Nabha", phone: "394858845", amenities: "Chemist, OTC & prescription medicines", area: "Nabha" },
  { name: "JP Pharmacy", location: "Nabha", phone: "394958485", amenities: "Chemist, OTC & prescription medicines", area: "Nabha" },
  { name: "Lucky Medicaments", location: "Purani Sabzi Mandi, Nabha", phone: "9378475745", amenities: "Chemist, OTC & prescription medicines", area: "Nabha" },
  { name: "Satkartar Medical Hall", location: "Mehs Gate / Exchange Rd, Nabha", phone: "09463868768", amenities: "Home delivery; OTC & prescription medicines", area: "Nabha" }
];

const areas = Array.from(new Set(pharmacies.map(p => p.area)));

function PillReminder() {
  const [medications, setMedications] = useState([
    { name: "Paracetamol", time: "08:00 AM" },
    { name: "Ibuprofen", time: "02:00 PM" },
  ]);
  const [newMedName, setNewMedName] = useState("");
  const [newMedTime, setNewMedTime] = useState("");

  const addMedication = () => {
    if (newMedName && newMedTime) {
      setMedications([...medications, { name: newMedName, time: newMedTime }]);
      setNewMedName("");
      setNewMedTime("");
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex items-center gap-2">
        <Pill className="text-blue-600" />
        <CardTitle>Pill Reminder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <Input
            placeholder="Medication Name"
            value={newMedName}
            onChange={e => setNewMedName(e.target.value)}
            className="w-1/2"
          />
          <Input
            placeholder="Time (e.g. 08:00 AM)"
            value={newMedTime}
            onChange={e => setNewMedTime(e.target.value)}
            className="w-1/2"
          />
          <Button onClick={addMedication}>Add</Button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Medication</th>
              <th className="text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, idx) => (
              <tr key={idx} className="border-t">
                <td>{med.name}</td>
                <td>{med.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function PharmaciesInformation() {
  const [selectedArea, setSelectedArea] = useState("Nabha");
  const filteredPharmacies = pharmacies.filter(p => p.area === selectedArea);

  const handleOrderMedicine = async (pharmacyName: string, medicineName: string) => {
    try {
      const userPhone = "1234567890"; // Replace with actual user phone if available
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pharmacyName, medicineName, userPhone })
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Order request sent to ${pharmacyName}`);
      } else {
        alert(`Order failed: ${data.error}`);
      }
    } catch (error) {
      alert("Order failed: Network error");
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Store className="text-green-600" />
        <CardTitle>Nearby Pharmacies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label htmlFor="area-select" className="font-semibold mr-2">Select Area:</label>
          <select
            id="area-select"
            value={selectedArea}
            onChange={e => setSelectedArea(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 text-left">Name</th>
                <th className="px-2 py-1 text-left">Location</th>
                <th className="px-2 py-1 text-left">Phone</th>
                <th className="px-4 py-2">Available Amenities & Medicines</th>
                <th className="px-4 py-2">Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredPharmacies.map((pharmacy, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 font-medium">{pharmacy.name}</td>
                  <td className="px-4 py-2">{pharmacy.location}</td>
                  <td className="px-4 py-2">{pharmacy.phone}</td>
                  <td className="px-4 py-2">{pharmacy.amenities}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded shadow"
                      onClick={() => handleOrderMedicine(pharmacy.name, "")}
                    >
                      Order Medicine
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-8">Medication Dashboard</h2>
      <PillReminder />
      <PharmaciesInformation />
    </div>
  );
}

export default DashboardPage;