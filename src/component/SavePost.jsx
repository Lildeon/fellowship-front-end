/* eslint-disable react/prop-types */
import api from "@/services/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const SavePost = ({ post, bookmark, qKey }) => {
  const user = localStorage.getItem("user");
  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    await api.post(`${bookmark}/${post._id}`);
  };

  const mutation = useMutation({
    mutationFn: handleBookmark,
    onMutate: async (postID) => {
      await queryClient.cancelQueries({ queryKey: [qKey] });

      const prevData = queryClient.getQueryData([qKey]);

      queryClient.setQueryData([qKey], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.data.posts.map((p) => {
              if (p._id !== postID) return p;

              const alreadyBookmark = p.bookmark.includes(user);
              return {
                ...p,
                bookmark: alreadyBookmark
                  ? p.bookmark.filter((id) => id !== user) // unbookmark
                  : [...p.bookmark, user], // bookmark
              };
            }),
          })),
        };
      });

      // return context for rollback
      return { prevData };
    },

    onError: (_err, _vars, context) => {
      // rollback on error
      queryClient.setQueryData([qKey], context.prevData);
    },

    onSettled: () => {
      // refetch to sync with server
      queryClient.invalidateQueries([qKey], {
        refetchType: "inactive",
      });
    },
  });

  return (
    <div onClick={() => mutation.mutate(post._id)} className="flex gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={
          post?.bookmark.includes(user)
            ? "size-6 stroke-green-700 fill-green-700 stroke-2"
            : "size-6 stroke-black stroke-2"
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
    </div>
  );
};

export default SavePost;
