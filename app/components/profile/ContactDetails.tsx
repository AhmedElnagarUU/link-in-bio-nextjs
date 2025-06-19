import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ContactInfo {
  icon: React.ElementType;
  value: string;
  href?: string;
}

interface ContactDetailsProps {
  email: string;
  phone: string;
  location: string;
  website: string;
}    

const ContactDetails: React.FC<ContactDetailsProps> = ({ email, phone, location, website }) => {
  const contactItems: ContactInfo[] = [
    { icon: Mail, value: email, href: `mailto:${email}` },
    { icon: Phone, value: phone, href: `tel:${phone}` },
    { icon: MapPin, value: location },
    { icon: Globe, value: website, href: `https://${website}` },
  ].filter(item => item.value);

  if (contactItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-center bg-white/50 p-4 rounded-xl shadow-inner">
            <item.icon className="w-8 h-8 text-orange-500 mr-4 bg-orange-100 p-1.5 rounded-lg" />
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-orange-500 transition-colors">
                {item.value}
              </a>
            ) : (
              <span className="text-slate-700">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;