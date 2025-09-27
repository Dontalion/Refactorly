import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeOutputProps {
  improvedCode: string;
  language: string;
  explanation: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ improvedCode, language, explanation }) => {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(improvedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Improved Code</h2>
        
        <div className="space-x-2">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-sm bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded"
          >
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
          
          <button
            onClick={copyToClipboard}
            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded"
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
      
      {showExplanation && explanation && (
        <div className="mb-4 p-3 bg-blue-50 rounded text-sm">
          <h3 className="font-bold text-blue-800 mb-1">Explanation:</h3>
          <p className="text-gray-700">{explanation}</p>
        </div>
      )}
      
      <div className="relative overflow-hidden rounded-lg border border-gray-300">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: '16px',
            borderRadius: '0.5rem',
            maxHeight: '400px',
          }}
        >
          {improvedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeOutput;
