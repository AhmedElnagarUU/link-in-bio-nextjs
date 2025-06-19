import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface LinkCardProps {
  title: string;
  url: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full p-5 text-left bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-slate-800">{title}</p>
        <ArrowUpRight className="text-slate-500 group-hover:text-orange-500 group-hover:rotate-45 transition-all" size={24} />
      </div>
    </a>
  );
};

export default LinkCard;