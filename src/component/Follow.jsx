/* eslint-disable react/prop-types */
import api from "@/services/axios";

const Follow = ({ userId, followed, onToggle }) => {
  const handleFollow = async () => {
    await api.post(`follow/${userId}`);
    onToggle();
  };

  return (
    <button type="button" onClick={handleFollow}>
      {followed?.followed ? followed?.followed : followed?.followed}
    </button>
  );
};

export default Follow;
