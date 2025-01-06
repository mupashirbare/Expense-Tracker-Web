import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_6tkn9lk', // Replace with your EmailJS Service ID
        'template_vqlhxtk', // Replace with your EmailJS Template ID
        form.current,
        'PI1jTwHcEf0o1AkJq' // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
          form.current.reset(); // Reset the form fields
        },
        (error) => {
          alert('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <>
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
          <p className="text-center text-xl font-semibold text-gray-700 mb-12">
            Have questions or need support? Fill out the form below, and our team will get back to you as soon as possible.
          </p>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white shadow-md rounded-lg p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none py-2 px-4"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none py-2 px-4"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none py-2 px-4"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none py-2 px-4"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Type your message here"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none py-2 px-4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
