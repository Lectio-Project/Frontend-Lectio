import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SyntheticEvent } from 'react';
import RatingStars from '../RatingStars/RatingStars';
import './Comment.css';

interface CommentProps {
    id: string;
    bookGrade: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: { id: string; name: string; imageUrl: string };
}
interface ImageErrorEvent extends SyntheticEvent<HTMLImageElement, Event> {
    target: EventTarget & {
        src: string;
    };
}
export default function Comment({
    id,
    bookGrade,
    text,
    createdAt,
    updatedAt,
    user
}: CommentProps) {
    function handleImageError(event: ImageErrorEvent) {
        event.target.src = initialImage;
    }

    function formatedDate(date: string) {
        return format(new Date(date), "dd 'de' MMMM 'às' HH:mm", {
            locale: ptBR
        });
    }

    const initialImage =
        'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

    return (
        <article className="comment-user" key={id}>
            <div className="comment-user-intern">
                <img
                    src={user.imageUrl || initialImage}
                    alt=""
                    onError={handleImageError}
                />

                <div className="comment-user-info">
                    <div>
                        <strong className="comment-username">
                            {user.name}
                        </strong>
                        <RatingStars
                            starsValues={bookGrade}
                            size="small"
                            readOnly
                        />
                    </div>

                    <span className="comment-date">
                        postado em {formatedDate(createdAt)}
                    </span>
                </div>
            </div>

            <p>{text}</p>
        </article>
    );
}
