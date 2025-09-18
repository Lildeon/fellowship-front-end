/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/axios";

const Repost = ({ post, repost, qKey }) => {
  const user = localStorage.getItem("user");
  const queryClient = useQueryClient();
  const handleRepost = async () => {
    await api.post(`${repost}/${post._id}`);
  };

  const mutation = useMutation({
    mutationFn: handleRepost,
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

              const alreadyReposted = p.reposts.includes(user);
              return {
                ...p,
                reposts: alreadyReposted
                  ? p.reposts.filter((id) => id !== user) // unlike
                  : [...p.reposts, user], // like
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
      queryClient.invalidateQueries([qKey]);
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutation.mutate(post._id)}
      className="flex gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={
          post?.reposts.includes(user)
            ? "size-6 stroke-purple-500 stroke-2"
            : "size-6 stroke-black stroke-2"
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    </button>
  );
};

export default Repost;
