import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { createClient } from '~/lib/supabase/client'; // Adjust the import path as necessary
import toast from 'react-hot-toast';

const FeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [feedback, setFeedback] = useState('');
  const supabase = createClient();

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
      toast.error('Error sending feedback. Please try again.');

    } else {
      console.log('Feedback inserted:', data);

      toast.success('Feedback sent successfully!');

    }
  };

  const handleSubmit = async () => {
    await sendFeedbackToSupabase();

    console.log('Feedback submitted:', feedback);
    handleClose();
  };

  return (
    <div className="relative">

      <button

        onClick={handleOpen}

        className="bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"

      >

        <MessageCircle size={18} className="mr-2" />

        Feedback
      </button>

      {isOpen && (

        <div className="absolute right-0 z-50 mt-2 w-96 rounded-lg bg-card p-4 shadow-lg border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-card-foreground text-xl font-semibold">Send feedback</h2>
            <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">

              <X size={20} />

            </button>

          </div>


          <textarea

            value={feedback}

            onChange={(e) => setFeedback(e.target.value)}

            placeholder="Ideas on how to improve this page. Use the Support Form for technical issues."
            className="w-full h-32 bg-input text-foreground rounded-md p-2 mb-4 resize-none"
          />

          <div className="flex justify-between items-center">

            <button

              onClick={handleSubmit}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center"

            >
              <Send size={16} className="mr-2" />

              Send feedback

            </button>

          </div>

          <p className="text-muted-foreground text-sm mt-4">

            Have a technical issue? Contact support or browse our docs.
          </p>

        </div>
      )}

    </div>

  );

};

export default FeedbackModal;
