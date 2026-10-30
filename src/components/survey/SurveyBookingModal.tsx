import React, { useState } from 'react';
import { SurveyBooking, Quotation } from '../../types';
import { BottomSheet } from '../common/BottomSheet';
import { ImageUpload } from '../common/ImageUpload';
import { CITIES_LIST } from '../../data/mockData';
import {
  CalendarCheck2,
  CheckCircle2,
  MapPin,
  Clock,
  User,
  Phone,
  Building,
  Upload,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface SurveyBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBooking: (booking: SurveyBooking) => void;
  quotationContext?: Quotation | null;
  selectedCity: string;
}

export const SurveyBookingModal: React.FC<SurveyBookingModalProps> = ({
  isOpen,
  onClose,
  onSaveBooking,
  quotationContext,
  selectedCity
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [customerName, setCustomerName] = useState('Rahul Verma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('rahul.verma@example.com');
  const [propertyType, setPropertyType] = useState('Residential Villa');

  const [address, setAddress] = useState('Flat 402, Green Palms, Andheri West');
  const [city, setCity] = useState(selectedCity || 'Mumbai');
  const [pinCode, setPinCode] = useState('400053');
  const [roofAreaSqFt, setRoofAreaSqFt] = useState(500);
  const [monthlyBillINR, setMonthlyBillINR] = useState(4500);

  const [preferredDate, setPreferredDate] = useState('2026-11-05');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [rooftopPhotoUrl, setRooftopPhotoUrl] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<SurveyBooking | null>(null);

  const handleSubmitBooking = () => {
    const refNum = `SURVEY-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: SurveyBooking = {
      id: `bk-${Date.now()}`,
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
      customerName,
      phone,
      email,
      propertyType,
      address,
      city,
      pinCode,
      roofAreaSqFt,
      monthlyBillINR,
      preferredDate,
      timeSlot,
      additionalNotes,
      rooftopPhotoUrl,
      status: 'Site Visit Scheduled',
      assignedEngineer: {
        name: 'Siddharth Deshmukh',
        phone: '+91 98200 11223',
        rating: 4.9
      }
    };

    onSaveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setStep(4);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={resetAndClose}
      title={step === 4 ? 'Site Survey Booking Confirmed' : 'Book Free Rooftop Site Survey'}
      subtitle={
        step === 4
          ? `Reference: ${confirmedBooking?.referenceNumber}`
          : `Step ${step} of 3 • Professional engineer technical inspection`
      }
    >
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Certified engineer visit in {city} for rooftop structural & shade assessment.</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Full Name</label>
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
              >
                <option value="Residential Villa">Residential Villa / Independent House</option>
                <option value="Apartment Society">Apartment / Cooperative Housing Society</option>
                <option value="Commercial Building">Commercial Building / Office</option>
                <option value="Industrial Plant">Industrial Factory / Warehouse</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-slate-900 text-amber-400 font-bold rounded-2xl text-xs flex items-center justify-center gap-2"
          >
            <span>Next: Property & Roof Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Site Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City Location</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                >
                  {CITIES_LIST.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Postal PIN Code</label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={e => setPinCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Roof Area (Sq Ft)</label>
                <input
                  type="number"
                  value={roofAreaSqFt}
                  onChange={e => setRoofAreaSqFt(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Bill (₹)</label>
                <input
                  type="number"
                  value={monthlyBillINR}
                  onChange={e => setMonthlyBillINR(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 bg-slate-900 text-amber-400 font-bold rounded-2xl text-xs flex items-center justify-center gap-2"
            >
              <span>Next: Date & Photo Upload</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900"
                >
                  <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                  <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>

            {/* Rooftop Photo Upload Component */}
            <ImageUpload
              label="Upload Rooftop Photo / Layout (Optional)"
              description="Helps engineer prepare 3D shadow report before visit"
              value={rooftopPhotoUrl}
              onChange={setRooftopPhotoUrl}
            />

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Additional Requirements</label>
              <textarea
                rows={2}
                placeholder="e.g. Needs battery backup for power cuts, elevated structure requirement..."
                value={additionalNotes}
                onChange={e => setAdditionalNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(2)}
              className="py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs"
            >
              Back
            </button>
            <button
              onClick={handleSubmitBooking}
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Survey Booking</span>
            </button>
          </div>
        </div>
      )}

      {step === 4 && confirmedBooking && (
        <div className="space-y-4 text-center">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-black text-slate-900">Site Survey Scheduled!</h4>
            <p className="text-xs text-slate-600">
              Reference Code: <strong className="text-amber-600">{confirmedBooking.referenceNumber}</strong>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Assigned Engineer:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.assignedEngineer?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Scheduled Time:</span>
              <span className="font-bold text-slate-900">
                {confirmedBooking.preferredDate} ({confirmedBooking.timeSlot})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Inspection Site:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.city}</span>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="w-full py-3 bg-slate-900 text-amber-400 font-bold rounded-2xl text-xs shadow-md"
          >
            Done & View Status
          </button>
        </div>
      )}
    </BottomSheet>
  );
};
