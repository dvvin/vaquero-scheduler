'use client';
import Navbar from "./Navbar/Navbar";
import SignIn from "./SignIn/SignIn";
import StudentInfo from "./StudentInfo/Info";
import CSCI_Catalog from './Catalogs/CSCI Catalog/CSCI_Catalog';
import UserComponent from './Catalogs/CSCI Catalog/test';

export default function Home() {

  return (
    <main className="bg-gray-100 min-h-screen">
      <header className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
        {/* <Navbar /> */}
      </header>

      {/* <UserComponent /> */}
      <CSCI_Catalog />
      {/* <SignIn />
       <StudentInfo /> */}
    </main>
  );
}
