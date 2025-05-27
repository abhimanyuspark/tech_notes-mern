import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { CheckBox, Menu } from "../../../components";
import { FaEdit, FaTrash } from "../../../assets/icons";
import { toast } from "react-toastify";
import { deleteUser } from "../../../redux/fetures/userSlice";
import { userToastDelete } from "../../../config/toastParams";
import { useAuth } from "../../../hooks";

export const Columns = [
  {
    id: "select",
    enableSorting: false,
    header: ({ table }) => {
      return (
        <CheckBox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <CheckBox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      );
    },
  },
  {
    accessorKey: "index",
    header: "Id",
    cell: (info) => {
      const index = info.row.index;
      return <span>{index + 1}</span>;
    },
    enableSorting: true,
    sortingFn: (row1, row2) => {
      return row1.index > row2.index ? -1 : 1;
    },
    sortDescFirst: false,
    invertSorting: true,
  },
  {
    accessorKey: "username",
    header: () => "Username",
    cell: (info) => {
      const value = info.getValue();
      const { _id, roles } = info.row.original;
      return (
        <div className="w-44 cursor-pointer">
          <Link
            // to={`/user/${_id}`}
            className="text-sm hover:underline font-semibold"
          >
            {value}
          </Link>
          <p className="text-sm">{roles.map((r) => r).join(", ")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "active",
    header: () => "Active",
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="w-52 text-md flex items-center gap-4">
          <span
            className={`${
              value ? "bg-green-600" : "bg-red-600"
            } size-2 rounded-full`}
          ></span>
          <span>{value ? "Active" : "In Active"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    enableSorting: false,
    header: () => "Actions",
    cell: (info) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const { isAdmin } = useAuth();
      const { _id } = info.row.original;

      const onDelete = async () => {
        toast.promise(
          dispatch(deleteUser(_id)).then((res) => {
            const data = res?.payload;
            if (res.error?.message === "Rejected") {
              throw new Error(data);
            }
            return data;
          }),
          userToastDelete
        );
      };

      return (
        <div className="flex items-center justify-end">
          <Menu>
            <li
              className="hover:bg-blue-900"
              onClick={() => {
                navigate(`/dash/users/edit/${_id}`);
              }}
            >
              <FaEdit />
              Edit
            </li>
            {isAdmin && (
              <li className="hover:bg-red-600" onClick={onDelete}>
                <FaTrash />
                Delete
              </li>
            )}
          </Menu>
        </div>
      );
    },
  },
];
