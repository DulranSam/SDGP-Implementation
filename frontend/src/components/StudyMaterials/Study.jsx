/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";

const Study = () => {
  const { loading, setLoading } = useContext(userContext);
  const [material, setMaterial] = useState([]);
  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const resources = await Axios.get("http://localhost:8000/resources");
      setMaterial(resources?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  return (
    <div>
      <h1>Study Page!</h1>
    </div>
  );
};

export default Study;
