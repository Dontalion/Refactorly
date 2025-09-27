import React from 'react';

interface SuggestionsProps {
  suggestions: string[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  if (!suggestions.length) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Improvement Suggestions</h2>
      
      <ul className="space-y-2 list-disc list-inside">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="text-gray-700">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
