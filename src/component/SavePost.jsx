/* eslint-disable react/prop-types */
import api from "@/services/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const SavePost = ({ postID, bookmark, booked, qKey }) => {
  const user = localStorage.getItem("user");
  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    await api.post(`${bookmark}/${postID}`);
  };

  const mutation = useMutation({
    mutationFn: handleBookmark,
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
    <div onClick={() => mutation.mutate(postID)} className="flex gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={booked.booked ? booked?.booked : booked?.booked}
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
