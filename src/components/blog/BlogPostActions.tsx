// src/components/blog/BlogPostActions.tsx
import { Heart, MessageCircleMore } from "lucide-react";

interface BlogPostActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  handleLikeToggle: () => Promise<void>;
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const BlogPostActions = ({
  isLiked,
  likesCount,
  commentsCount,
  handleLikeToggle,
}: BlogPostActionsProps) => {
  return (
    <div className="flex justify-start">
      <div className="flex justify-center items-center mt-7 ml-1 gap-x-4">
        {/* Likes icon */}
        <div>
          <Heart
            size={20}
            onClick={handleLikeToggle}
            className={`${
              isLiked ? "text-red-500 fill-red-500" : ""
            } cursor-pointer`}
          />
          <p className={`text-xs mt-2 text-center`}>{likesCount}</p>
        </div>
        {/* Comments icon*/}
        <div>
          <MessageCircleMore
            onClick={() => scrollToSection("comment")}
            className="cursor-pointer text-green-600"
            size={20}
          />
          <p className="text-xs mt-2 text-center">{commentsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostActions;
