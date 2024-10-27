import React from 'react';

const Footer = () => {
  // TODO complete this footer

  return (
    <footer className="bg-gray-800 py-8" data-testid="page-footer">
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">NAVIGATION</h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            SUBSCRIBE TO RECEIVE OUR LATEST UPDATE
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
