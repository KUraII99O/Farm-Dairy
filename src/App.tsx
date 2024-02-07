// App.tsx
import React from 'react';
import Footer from './component/footer';
import Header from './component/Header';
import Home from './component/sidebar';
import DropdownComponent from './component/DropDown';


const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Home />
      <div className="flex flex-col w-full">
        <Header />
        {/* Main content goes here */}
        <div className="p-4">
        <DropdownComponent />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
