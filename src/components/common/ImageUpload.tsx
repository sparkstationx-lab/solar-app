import React, { useState } from 'react';
import { Camera, Upload, Check, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  description?: string;
  value?: string;
  onChange: (url: string) => void;
}

const SAMPLE_ROOFTOP_IMAGES = [
  'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1548611716-3001859e4b6d?auto=format&fit=crop&w=600&q=80'
];

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  description,
  value,
  onChange
}) => {
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSample = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700">{label}</label>
      {description && <p className="text-[11px] text-slate-500">{description}</p>}

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
          <img src={preview} alt="Upload Preview" className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <button
              type="button"
              onClick={() => {
                setPreview(undefined);
                onChange('');
              }}
              className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg"
            >
              Remove / Replace
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow">
            <Check className="w-3.5 h-3.5" />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-4 bg-slate-50 cursor-pointer transition">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Camera className="w-5 h-5 text-amber-500" />
              <Upload className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-xs font-semibold text-slate-700">Tap to upload photo or document</span>
            <span className="text-[10px] text-slate-400">JPG, PNG or PDF (Max 10MB)</span>
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Sample Preset Chooser */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Or pick sample rooftop photo:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_ROOFTOP_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSample(img)}
                  className="relative rounded-xl overflow-hidden border border-slate-200 h-16 hover:border-amber-500 transition focus:ring-2 focus:ring-amber-500"
                >
                  <img src={img} alt={`Sample ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-white/80" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
