import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiArrowLeftLine, RiArrowRightLine, RiMedalLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import { databases } from "../config/database";
import { Query } from "appwrite";

const Leaderboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_USERS_COLLECTION_ID,
          []
        );
        const sorted = res.documents
          .filter((u) => u.points !== undefined)
          .sort((a, b) => b.points - a.points)
          .map((u, i) => ({ ...u, rank: i + 1 }));
        setUsers(sorted);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };
    fetchUsers();
  }, []);

  const paginatedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const currentUserRank = users.find((u) => u.$id === user?.$id)?.rank;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-orange-400 flex items-center justify-center gap-2">
          <RiMedalLine className="text-3xl" />
          Leaderboard
        </h2>
        <p className="text-sm text-zinc-400">Top players ranked by points</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-3 bg-zinc-800 px-4 py-2 text-sm text-zinc-400 font-semibold">
          <div>Rank</div>
          <div>Name</div>
          <div>Points</div>
        </div>

        {paginatedUsers.map((u) => (
          <div
            key={u.$id}
            className={`grid grid-cols-3 px-4 py-2 text-sm ${
              u.$id === user?.$id
                ? "bg-orange-900/20 text-orange-400 font-bold"
                : "text-zinc-300 hover:bg-zinc-800/40"
            } transition`}
          >
            <div>#{u.rank}</div>
            <div>{u.name || u.email.split("@")[0]}</div>
            <div>{u.points}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="flex items-center gap-1 text-sm text-orange-400 hover:underline disabled:opacity-30"
        >
          <RiArrowLeftLine />
          Prev
        </button>
        <button
          disabled={(currentPage + 1) * itemsPerPage >= users.length}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="flex items-center gap-1 text-sm text-orange-400 hover:underline disabled:opacity-30"
        >
          Next
          <RiArrowRightLine />
        </button>
      </div>

      {currentUserRank && (
        <div className="mt-6 text-center text-zinc-400 text-sm">
          You're currently ranked{" "}
          <span className="text-orange-400 font-bold">#{currentUserRank}</span>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
