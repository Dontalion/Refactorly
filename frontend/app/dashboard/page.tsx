// src/app/dashboard/page.tsx
'use client';

import { withAuth } from '../../context/AuthContext';
import { useState } from 'react';
import CodeInput from '../../components/dashboard/CodeInput';
import CodeOutput from '../../components/dashboard/CodeOutput';
import Suggestions from '../../components/dashboard/Suggestions';
import { refactorCode } from '../../services/refactor';

function Dashboard() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [improvedCode, setImprovedCode] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter some code to refactor');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await refactorCode(code, language);
      setImprovedCode(result.improved_code);
      setSuggestions(result.suggestions);
      setExplanation(result.explanation);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to refactor code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Code Refactoring Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <CodeInput 
            code={code} 
            setCode={setCode} 
            language={language}
            setLanguage={setLanguage}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
        
        <div className="space-y-6">
          {improvedCode && (
            <CodeOutput 
              improvedCode={improvedCode} 
              language={language}
              explanation={explanation}
            />
          )}
          
          {suggestions.length > 0 && (
            <Suggestions suggestions={suggestions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
