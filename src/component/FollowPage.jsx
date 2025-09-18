/* eslint-disable react/prop-types */
import api from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FollowPage = ({ page, url }) => {
  const currentUserId = localStorage.getItem("user");
  const queryClient = useQueryClient();
  const handleFollow = async () => {
    await api.post(`${url}/${page._id}`);
  };

  const mutation = useMutation({
    mutationFn: handleFollow,
    onMutate: async (pageTofollowId) => {
      await queryClient.cancelQueries({ queryKey: ["page", pageTofollowId] });
      const prevData = queryClient.getQueryData(["page", pageTofollowId]);
      queryClient.setQueryData(["page", pageTofollowId], (old) => {
        if (!old) return old;
        const alreadyFollowing = old.followers.includes(currentUserId);
        return {
          ...old,

          followers: alreadyFollowing
            ? old.followers.filter((id) => id._id !== currentUserId)
            : [...old.likes, currentUserId],
        };
      });
      return { prevData };
    },
    onError: (_err, _vars, context) => {
      // rollback on error
      queryClient.setQueryData(
        ["page", context.prevData._id],
        context.prevData,
      );
    },

    onSettled: (_data, _err, { pageTofollowId }) => {
      // refetch to sync with server
      queryClient.invalidateQueries(["page", pageTofollowId], {
        refetchType: "inactive",
      });
    },
  });

  return (
    <button type="button" onClick={() => mutation.mutate(page._id)}>
      {page?.followers.includes(currentUserId) ? (
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
