/* eslint-disable react/prop-types */
import api from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Follow = ({ user }) => {
  const currentUserId = localStorage.getItem("user");
  const queryClient = useQueryClient();
  const handleFollow = async () => {
    await api.post(`follow/${user._id}`);
  };
  const mutation = useMutation({
    mutationFn: handleFollow,
    onMutate: async (userTofollowId) => {
      await queryClient.cancelQueries({ queryKey: ["user", userTofollowId] });
      const prevData = queryClient.getQueryData(["user", userTofollowId]);
      queryClient.setQueryData(["user", userTofollowId], (old) => {
        if (!old) return old;
        const alreadyFollowing = old.follower.includes(currentUserId);
        return {
          ...old,

          follower: alreadyFollowing
            ? old.follower.filter((id) => id._id !== currentUserId)
            : [...old.likes, currentUserId],
        };
      });
      return { prevData };
    },
    onError: (_err, _vars, context) => {
      // rollback on error
      queryClient.setQueryData(
        ["user", context.prevData._id],
        context.prevData,
      );
    },

    onSettled: (_data, _err, { userTofollowIdUserId }) => {
      // refetch to sync with server
      queryClient.invalidateQueries(["user", userTofollowIdUserId], {
        refetchType: "inactive",
      });
    },
  });

  return (
    <button type="button" onClick={() => mutation.mutate(user._id)}>
      {user?.follower?.includes(currentUserId) ? (
        <p className="px-5 py-1 h-fit w-28 rounded-2xl border">following</p>
      ) : (
        <p className="px-5 py-1 h-fit w-28 rounded-2xl bg-black text-white">
          follow
        </p>
      )}
    </button>
  );
};

export default Follow;
