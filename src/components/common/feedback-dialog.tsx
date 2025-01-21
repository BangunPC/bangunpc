import React, { useState, useRef } from 'react';
import {  Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client'; // Adjust the import path as necessary
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';

const FeedbackDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown menu

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
    if(feedback.trim().length !== 0) {
      await sendFeedbackToSupabase()
      handleClose()
    }
  };

  return (
    <div className="relative">
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button onClick={() => setIsOpen(true)} variant="outline">Feedback</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <div
            ref={dropdownRef} // Attach the ref to the dropdown
            className="absolute right-0 z-50 mt-2 w-96 rounded-lg bg-card p-4 shadow-lg border border-border"
          >
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Feedback Anda akan bermanfaat untuk pelayanan kami kedepannya..."
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