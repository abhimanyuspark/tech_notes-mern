import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputSelect,
  Loader,
  CancelButton,
  TextArea,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedNote,
  getSelectedNote,
  postNote,
  updateNote,
} from "../../../redux/fetures/noteSlice";
import { useNavigate, useParams } from "react-router";
import { validation } from "../../../utils/validation";
import { toast } from "react-toastify";
import { noteToastAdd, noteToastUpdate } from "../../../config/toastParams";
import { useAuth } from "../../../hooks";
import { getUsers } from "../../../redux/fetures/userSlice";

const status = [
  { name: "Completed", value: true },
  { name: "In Progress", value: false },
];

const NoteForm = () => {
  const { isAdmin, username } = useAuth();
  const { id } = useParams();
  const { loading: notesLoading, selectedNote } = useSelector(
    (state) => state.notes
  );
  const { users, loading: usersLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = notesLoading || usersLoading;

  const userFiltered = users.filter((user) => user.username === username);
  const filteredUsers = isAdmin ? users : userFiltered;

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    user: "",
    completed: false,
  });

  const [formError, setFormError] = useState({
    title: "",
    text: "",
    user: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "completed" ? value === "true" : value,
    });
    setFormError({
      ...formError,
      [name]: "",
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validate = validation(formData);
    const isValid = Object.values(validate).length === 0;

    if (isValid) {
      if (id) {
        await toast.promise(
          dispatch(updateNote({ ...formData, id: formData?._id })).then(
            (res) => {
              const data = res?.payload;
              if (res.error && res.error.message === "Rejected") {
                throw new Error(data);
              }
              navigate(-1, { replace: true });
            }
          ),
          noteToastUpdate
        );
      } else {
        await toast.promise(
          dispatch(postNote(formData)).then((res) => {
            const data = res?.payload;
            if (res.error && res.error.message === "Rejected") {
              throw new Error(data);
            }
            navigate(-1, { replace: true });
          }),
          noteToastAdd
        );
      }
    } else {
      setFormError(validate);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getSelectedNote(id)).then((res) => {
        const data = res?.payload || {}; // Ensure it's always an object
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      });
    }
    return () => {
      dispatch(clearSelectedNote());
    };
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getUsers()).then((res) => {
      const data = res?.payload || [];
      const userFiltered = data.filter((user) => user.username === username);
      if (userFiltered.length > 0) {
        setFormData((prev) => ({
          ...prev,
          user: userFiltered[0]._id,
        }));
      }
    });
  }, [dispatch, username]);

  return (
    <div className="flex flex-col gap-4">
      {loading ? <Loader /> : ""}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl">{id ? "Update Note" : "New Note"}</h2>

        {/* creted and updated date */}

        {id && (
          <div className="flex gap-2">
            <div className="text-sm flex flex-col gap-2 items-start">
              <span>Created At</span>
              <span>Updated At</span>
            </div>
            <div className="text-sm flex flex-col gap-2 items-center">
              <span>
                {new Date(selectedNote?.createdAt).toLocaleDateString()}
              </span>
              <span>
                {new Date(selectedNote?.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Input
          important
          label="Title"
          name="title"
          value={formData.title}
          error={formError.title}
          onChange={onChange}
        />
        <TextArea
          important
          label="Text"
          name="text"
          value={formData.text}
          error={formError.text}
          onChange={onChange}
        />

        {id ? (
          <InputSelect
            name={"completed"}
            label={"Status"}
            value={formData.completed}
            onChange={onChange}
          >
            {status.map((a, i) => (
              <option key={i} value={a.value}>
                {a.name}
              </option>
            ))}
          </InputSelect>
        ) : (
          ""
        )}

        <InputSelect
          important
          value={formData.user}
          name="user"
          label="User"
          onChange={onChange}
        >
          {filteredUsers.map((u, i) => (
            <option key={i} value={u._id}>
              {u.username}
            </option>
          ))}
        </InputSelect>

        <div className="flex gap-2 items-center">
          <Button text="Submit" type="submit" />
          <CancelButton
            text="Cancel"
            onClick={() => {
              navigate(-1, { replace: true });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
