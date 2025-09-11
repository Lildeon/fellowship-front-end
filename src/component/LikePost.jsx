/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/axios";

const LikePost = ({ postID, like, liked, qKey }) => {
  const queryClient = useQueryClient();
  const user = localStorage.getItem("user");
  const handleLike = async () => {
    await api.post(`${like}/${postID}`);
  };

  const mutation = useMutation({
    mutationFn: handleLike,
    onMutate: async (postID) => {
      await queryClient.cancelQueries({ queryKey: [qKey] });

      const prevPost = queryClient.getQueryData([qKey]);

      queryClient.setQueryData([qKey], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.data.posts.map((p) => {
              if (p._id !== postID) return p;

              const alreadyLiked = p.likes.includes(user);
              return {
                ...p,
                likes: alreadyLiked
                  ? p.likes.filter((id) => id !== user) // unlike
                  : [...p.likes, user], // like
              };
            }),
          })),
        };
      });

      // return context for rollback
      return { prevPost };
    },

    onError: (_err, _vars, context) => {
      // rollback on error
      queryClient.setQueryData([qKey], context.prevData);
    },

    onSettled: () => {
      // refetch to sync with server
      queryClient.invalidateQueries([qKey]);
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutation.mutate(postID)}
      className="flex gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={liked.liked ? liked?.liked : liked?.liked}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
};

export default LikePost;
