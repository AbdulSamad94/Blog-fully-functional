"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
} from "./ui/alert-dialog";
import { ToastContainer, toast } from "react-toastify";

interface Idtype {
  id: string;
}

const Delete = ({ id }: Idtype) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/deletePost/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (data.success) {
      toast.success("Post deleted successfully.");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } else {
      toast.error("Couldn't delete post.");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-red-500 transition-colors hover:text-red-800">
            <Trash2 size={20} />
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you actually want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove all related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ToastContainer />
    </>
  );
};

export default Delete;
