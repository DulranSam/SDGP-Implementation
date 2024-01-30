/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { AddMaterial, FetchMaterial } from "../Api/Api";

const Study = () => {
  const { loading, setLoading, status, setStatus } = useContext(userContext);
  const [material, setMaterial] = useState([]);
  const [data, setData] = useState({
    topic: "",
    title: "",
    about: "",
    subtopic: "",
  });

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const resources = await FetchMaterial();
      setMaterial(resources);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMaterial = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resources = await AddMaterial(data);
      if (resources.status === 201) {
        setStatus("Added Resource!");
      } else {
        setStatus("Error while adding resource!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Study Page!</h1>
      <p>
        {loading ? (
          "Loading..."
        ) : material && material.length ? (
          JSON.stringify(material)
        ) : (
          <h1>No materials added yet!</h1> //we can edit the questions from here!
        )}
      </p>
      <div className="addQues">
        <form onSubmit={addMaterial}>
          <input
            onChange={handleChange}
            name="topic"
            placeholder="Enter topic"
            type="text"
          ></input>
          <input
            onChange={handleChange}
            name="title"
            placeholder="Enter title"
            type="text"
          ></input>
          <input
            onChange={handleChange}
            name="about"
            placeholder="Enter about"
            type="text"
          ></input>
          <input
            onChange={handleChange}
            name="subtopic"
            placeholder="Enter subtopic"
            type="text"
          ></input>
          <button type="submit" name="Add Resource!" />
        </form>
      </div>
    </div>
  );
};

export default Study;
