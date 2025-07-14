
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { localDatabase } from '@/data/localDatabase';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  placeholder = "Enter your email",
  className
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get all unique emails from the database
  const allEmails = localDatabase.users.map(user => user.email);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = allEmails.filter(email =>
        email.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowSuggestions(filtered.length > 0 && value !== filtered[0]);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (email: string) => {
    onChange(email);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="email"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => value.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
        placeholder={placeholder}
        className={className}
        autoComplete="email"
        required
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1"
        >
          {suggestions.map((email, index) => (
            <div
              key={email}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                index === selectedIndex ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => handleSuggestionClick(email)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
