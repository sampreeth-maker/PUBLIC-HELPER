import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<{ items: AccordionItemProps[]; className?: string }> = ({
  items,
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs transition-all hover:border-slate-300"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-800 hover:text-slate-900 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg pr-4">{item.question}</span>
              <span className="shrink-0 p-1 rounded-full bg-slate-100 text-slate-600">
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
