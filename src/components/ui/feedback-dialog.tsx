import React, { useState, useEffect, useRef } from 'react';
import {  Send, MessageCircle } from 'lucide-react';
import { createClient } from '~/lib/supabase/client'; // Adjust the import path as necessary
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from './button';

const FeedbackDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown menu

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFeedback('');
  };

  const sendFeedbackToSupabase = async () => {
    const { data, error } = await supabase
      .from('feedbacks')
      .insert([{ description: feedback, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('Error inserting feedback:', error);
      alert('Error sending feedback.'); // {{ edit_2 }}
    } else {
      console.log('Feedback inserted:', data);
      alert('Feedback sent successfully!'); // {{ edit_3 }}
    }
  };

  const handleSubmit = async () => {
    await sendFeedbackToSupabase();
    console.log('Feedback submitted:', feedback);
    handleClose();
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Feedback</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
        <div
          ref={dropdownRef} // Attach the ref to the dropdown
          className="absolute right-0 z-50 mt-2 w-96 rounded-lg bg-card p-4 shadow-lg border border-border"
        >
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Ideas on how to improve this page. Use the Support Form for technical issues."
            className="w-full h-32 bg-input text-foreground rounded-md p-2 mb-4 resize-none"
          />

          <div className="flex justify-end items-center">
            <button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center"
            >
              <Send size={16} className="mr-2" />
              Kirim
            </button>
          </div>
        </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FeedbackDialog;