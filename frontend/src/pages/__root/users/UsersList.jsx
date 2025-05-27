import React, { useEffect, useState } from "react";
import { Button, Error, Table } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUsersList,
  deleteSelectedUsers,
  getUsers,
} from "../../../redux/fetures/userSlice";
import { Columns } from "./Column";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { userToastDelete } from "../../../config/toastParams";

const UsersList = () => {
  const { users, loading } = useSelector((state) => state.users);
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ids, setIds] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(clearUsersList());
    };
  }, [dispatch]);

  if (error) {
    return (
      <Error message={`UnAuthorized Access or Server not respond : ${error}`} />
    );
  }

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.promise(
          dispatch(deleteSelectedUsers(ids))
            .unwrap()
            .then((data) => {
              setIds([]); // Clear selected ids
              return data;
            }),
          userToastDelete
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex justify-between w-full">
        <Button
          onClick={() => {
            navigate("/dash/users/new");
          }}
          text="Add User"
        />
        {ids.length > 0 && <Button onClick={handleDelete} text="Delete" />}
      </div>
      <Table
        Columns={Columns}
        data={users}
        loading={loading}
        onSelectedRowIdsChange={setIds}
      />
    </div>
  );
};

export default UsersList;
