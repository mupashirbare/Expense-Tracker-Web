import React from 'react';

const About = () => {
  return (
    <>
      <section className="bg-gray-200 text-gray-800 py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Expense Tracker</h1>
          <p className="text-lg md:text-xl mb-8">
            Our goal is to help you take control of your finances by offering a powerful yet simple expense tracking solution.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
              <p className="text-gray-600">
                Navigate your expenses effortlessly with our intuitive design.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Advanced Budgeting</h3>
              <p className="text-gray-600">
                Plan and manage expense tracker with advanced tools tailored for your needs.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Detailed Reports</h3>
              <p className="text-gray-600">
                Gain insights into your spending habits with comprehensive visual reports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
