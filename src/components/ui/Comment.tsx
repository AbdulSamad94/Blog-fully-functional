"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { SendHorizontal, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./alert-dialog";
import { ToastContainer, toast } from "react-toastify";

interface CommentType {
  _id: string;
  user: {
    name: string;
    image: string;
    _id: string;
  };
  text: string;
  createdAt: string;
}

const CommentsSection = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");
  const [showSendButton, setShowSendButton] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch comments");

        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  // Handle new comment submission
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !session?.user) return;

    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: commentText,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setComments(result.comments); // Update with new comments
        setCommentText(""); // Clear input
        setShowSendButton(false); // Hide send button
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId: string) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      if (response.ok) {
        toast.success("Comment deleted successfully.");
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-2xl mt-20 mb-8">Comments</h3>

      {/* Input field for adding a comment */}
      <div className="flex gap-x-2 items-center mb-6">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="User profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className="relative flex-grow">
          <input
            className="rounded-full h-12 w-full outline-none border bg-background pl-5 pr-10"
            type="text"
            value={commentText}
            placeholder="Leave a comment..."
            onChange={(e) => {
              setCommentText(e.target.value);
              setShowSendButton(e.target.value.trim() !== "");
            }}
          />
          <SendHorizontal
            size={20}
            className={`absolute right-3 bottom-[13px] text-blue-500 cursor-pointer ${
              showSendButton ? "block" : "hidden"
            }`}
            onClick={handleCommentSubmit}
          />
        </div>
      </div>

      {/* List of comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="flex gap-4 mb-10">
            <Image
              src={comment.user.image}
              alt={comment.user.name}
              width={40}
              height={40}
              className="rounded-full w-8 h-8"
            />

            <div className="flex justify-between w-full">
              {/*comment info */}
              <div className="flex flex-col w-[90%]">
                <div className="flex flex-wrap items-center gap-x-3">
                  <p className="text-sm font-semibold">{comment.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="text-xs md:text-sm font-light break-words w-[85%] mt-1">
                  {comment.text}
                </p>
              </div>
              {/* Delete button */}
              <div className="flex items-center md:justify-end gap-x-4">
                {/* Delete Button */}
                {session?.user?.id === comment.user._id && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer"
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Do you want to delete this comment?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your comment and remove all related data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-2 md:mt-0">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default CommentsSection;
