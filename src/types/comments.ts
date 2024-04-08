export interface CommentProps {
    id: string;
    bookGrade: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: { id: string; name: string; imageUrl: string };
  }