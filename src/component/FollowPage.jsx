/* eslint-disable react/prop-types */
import api from "@/services/axios";

const FollowPage = ({ pageId, url, followed, onToggle }) => {
  const handleFollow = async () => {
    await api.post(`${url}/${pageId}`);
    onToggle();
  };

  return (
    <button type="button" onClick={handleFollow}>
      {followed?.followed === "following" ? (
        <p
          className="px-5 py-1 h-fit w-28
    rounded-2xl border"
        >
          following
        </p>
      ) : (
        <p
          className="px-5 py-1 h-fit w-28
    rounded-2xl bg-black text-white"
        >
          follow
        </p>
      )}
    </button>
  );
};

export default FollowPage;
