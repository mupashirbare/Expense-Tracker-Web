import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/400x300.png?text=Image+Not+Available";
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gray-300 text-gray-800 py-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your Expenses Seamlessly
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Manage your budget effectively with our user-friendly expense
              tracker.
            </p>
            <div className="mt-6 flex justify-center md:justify-center">
              <Link
                to={"/Login"}
                className="bg-blue-600 text-white py-3 px-10 rounded-md hover:bg-gray-700"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <aside className="md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img
              src="https://media.istockphoto.com/id/2165903890/photo/computer-app-for-money-budget.jpg?s=2048x2048&w=is&k=20&c=dyWexDBcrmgCRXm6IhbZutroEo7h2s81LrFVALbkMpQ="
              alt="Expense Tracker"
              className="rounded-md shadow-lg max-w-full h-auto"
              onError={handleImageError}
            />
          </aside>
        </div>
      </section>
      <About />

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Our Gallery services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "https://media.istockphoto.com/id/2149346220/photo/woman-setting-financial-goals-at-home.jpg?s=2048x2048&w=is&k=20&c=uNNTWBFjX9-rNMdU0icLvI2rouF_i89CgG16yKEW374=",
              "https://media.istockphoto.com/id/1171521006/photo/reviewing-a-financial-report-in-returning-on-investment-analysis.jpg?s=2048x2048&w=is&k=20&c=0jo1Ibz5MWaGf9S0-EEsMUdJnVqpYBzpb9ThwPuuMI4=",
              "https://media.istockphoto.com/id/1342223620/photo/unrecognizable-afro-american-businessman-checking-family-expenses-using-digital-tablet.jpg?s=2048x2048&w=is&k=20&c=CvNAk-xI_Lskq72X501oXeuJi0VOony2fDAcRqZyjMY=",
              "https://media.istockphoto.com/id/1661022982/photo/woman-watching-stock-charts.jpg?s=2048x2048&w=is&k=20&c=pIXOTF79Xsvf7XfYw6Pdt7rDHHes2KUFVWv4Sa2pZcg=",
              "https://media.istockphoto.com/id/1304045369/vector/tiny-person-planning-budget.jpg?s=612x612&w=0&k=20&c=K_hUvo8FkEV8ajJQoYHdAUtnUt8ca9eccGAhD3wT_XQ=",
              "https://media.istockphoto.com/id/1393379221/photo/financial-family-planning-and-budgeting-the-concept-of-money-management-for-a-little-person.jpg?s=612x612&w=0&k=20&c=vC2zM6hceLmdOnrm8yqZiMFiZYBIz1_Fqa-54gr9_s4=",
            ].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="rounded-md shadow-lg w-full h-auto"
                onError={handleImageError}
              />
            ))}
          </div>
        </div>
      </section>
      

           {/* Testimonials Section */}
     <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">What People Say About Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                rating: 3,
                text: "Good experience but needs improvement!",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
              },
              {
                rating: 4,
                text: "Very useful and easy to use.",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
              },
              {
                rating: 5,
                text: "Absolutely love this app! Highly recommend.",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-lg rounded-md text-center"
              >
                <img
                  src={review.image}
                  alt={`User ${index + 1}`}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/100?text=No+Image")
                  }
                />
                <p className="mb-4">{review.text}</p>
                <div className="text-yellow-400">
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
