import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        navigate("/");
        enqueueSnackbar('Book Deleted Successfully', {variant: 'success'});
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('error', {variant: 'error'});
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4">
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">ID</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500"> Title </span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleDeleteBook}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
