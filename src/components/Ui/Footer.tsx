import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeart,
} from 'react-icons/fa';
import { MdLocationOn, MdPhone } from 'react-icons/md';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-50 to-white border-t border-purple-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm w-full md:w-auto">
            <h2 className="text-lg font-bold text-purple-700 mb-3 flex items-center">
              <div className="w-2 h-8 bg-purple-500 mr-2 rounded-full"></div>
              Sipa
            </h2>
            <p className="text-gray-600 text-sm mb-4 border-l-2 border-purple-200 pl-3">
              Platform pelaporan untuk kasus kekerasan terhadap perempuan dan
              anak.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs bg-purple-50 p-2 rounded-md hover:bg-purple-100 transition">
                <MdLocationOn className="text-purple-600 mr-2" />
                <span>Jl. Raya Kebebasan No. 17</span>
              </div>
              <div className="flex items-center text-xs bg-purple-50 p-2 rounded-md hover:bg-purple-100 transition">
                <MdPhone className="text-purple-600 mr-2" />
                <span>+62 812 3456 7890</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-xs font-medium text-purple-600">
              Ikuti Kami
            </div>
            <div className="flex space-x-2">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-500 hover:text-purple-600 bg-white p-3 rounded-full shadow-sm hover:shadow-md transition"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Copyright */}
          <div className="bg-white p-4 rounded-lg shadow-sm text-center md:text-right w-full md:w-auto">
            <div className="inline-block border-b-2 border-purple-100 pb-2 mb-2">
              <Link
                to="/team"
                className="text-purple-600 hover:text-purple-800 font-medium transition duration-200 flex items-center"
              >
                <span>Tim Capstone</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
            <p className="text-xs text-gray-500 flex items-center justify-center md:justify-end">
              © {currentYear} Sipa. Dibuat dengan{' '}
              <FaHeart className="inline text-red-500 mx-1" size={12} />{' '}
              oleh&nbsp;
              <span className="font-medium">Tim</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
