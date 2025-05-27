import React from "react";
import { Link } from "react-router";
import { FaLongArrowAltRight } from "../../assets/icons";
import { useAuth } from "../../hooks";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  return (
    <main className="flex gap-4 flex-col">
      <h2>Welcome {username}</h2>
      <div className="flex gap-4 flex-col items-start">
        <Link
          to="/dash/notes"
          className="flex items-center gap-4 text-lg hover:text-blue-400 hover:underline hover:underline-offset-4 w-auto"
        >
          <FaLongArrowAltRight className="text-xl" /> Tech Notes
        </Link>

        {isManager || isAdmin ? (
          <Link
            to="/dash/users"
            className="flex items-center gap-4 text-lg hover:text-blue-400 hover:underline hover:underline-offset-4 w-auto"
          >
            <FaLongArrowAltRight className="text-xl" /> User Settings
          </Link>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default Welcome;
