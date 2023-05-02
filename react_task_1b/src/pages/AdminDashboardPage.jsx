import React from "react";
import Nav from "../components/Nav";
import Table from "../components/Table";

const AdminDashboardPage = () => {
  return (
    <section className="px-16 text-white bg-black min-h-screen w-full pb-8">
      <Nav />
      <div className=" text-gray-700 ">
        <div className="w-full flex justify-between items-center mt-10">
          <p className="text-3xl">Today's leaderboard</p>
          <div className=" bg-white/10 gap-2 rounded-xl text-sm py-1 px-4 flex justify-between items-center">
            <p className="">30 May, 2022</p>
            <span className="indicator"></span>
            <div className="bg-brand text-xs rounded-lg p-[0.18rem] ">
              SUBMISSIONS OPEN
            </div>
            <span className="indicator"></span>
            11:34
          </div>
        </div>
        <Table />
      </div>
    </section>
  );
};

export default AdminDashboardPage;
