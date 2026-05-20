import type { Post } from "@my-app/shared";
import "./Post.css";

function onUsernameClick() {}
function onImageClick() {}
function onContentClick() {}
function onComment() {}
function onLike() {}
function onBookmark() {}
function onShare() {}

type AvatarIconProps = {
    pfp_url?: string;
};

const AvatarIcon = ({ pfp_url }: AvatarIconProps) => {
    if (pfp_url == null) {
        pfp_url = "/src/assets/icons/avatar.svg";
    }

    return <img src={pfp_url}></img>;
};

const CommentIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 14H18V12H6V14ZM6 11H18V9H6V11ZM6 8H18V6H6V8ZM22 22L18 18H4C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V22ZM4 16H18.85L20 17.125V4H4V16Z"
            fill="#1D1B20"
        />
    </svg>
);

const HeartIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M20.8401 4.61012C20.3294 4.09912 19.7229 3.69376 19.0555 3.4172C18.388 3.14064 17.6726 2.99829 16.9501 2.99829C16.2276 2.99829 15.5122 3.14064 14.8448 3.4172C14.1773 3.69376 13.5709 4.09912 13.0601 4.61012L12.0001 5.67012L10.9401 4.61012C9.90843 3.57842 8.50915 2.99883 7.05012 2.99883C5.59109 2.99883 4.19181 3.57842 3.16012 4.61012C2.12843 5.64181 1.54883 7.04108 1.54883 8.50012C1.54883 9.95915 2.12843 11.3584 3.16012 12.3901L12.0001 21.2301L20.8401 12.3901C21.3511 11.8794 21.7565 11.2729 22.033 10.6055C22.3096 9.93801 22.4519 9.2226 22.4519 8.50012C22.4519 7.77763 22.3096 7.06222 22.033 6.39476C21.7565 5.7273 21.3511 5.12087 20.8401 4.61012Z"
            stroke="#1E1E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const BookmarkIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
            stroke="#1E1E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ShareIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15"
            stroke="#1E1E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ImagePlaceholder = () => (
    <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="320" height="320" fill="#999999" />
    </svg>
);

function getDateFromUUIDv7(uuid: string): Date {
    // Remove hyphens and take the first 12 hex characters (48 bits)
    const hexTimestamp = uuid.replace(/-/g, "").substring(0, 12);

    // Convert hex to a decimal integer (milliseconds)
    const timestampMs = parseInt(hexTimestamp, 16);

    return new Date(timestampMs);
}

function DateTimeToString(datetime: Date): string {
    const date = new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(datetime);

    const time = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
    }).format(datetime);

    return `${date} @ ${time}`;
}

type PostProps = {
    id: string;
    username: string;
    pfp_url?: string;
    image_url?: string;
    content: string;
    comments: number;
    likes: number;
    bookmarks: number;
};

export function Post({
    id,
    username,
    pfp_url,
    content,
    image_url,
    comments,
    likes,
    bookmarks,
}: PostProps) {
    return (
        <article className="post">
            <header className="post-header">
                <button className="post-author" onClick={onUsernameClick}>
                    <AvatarIcon pfp_url={pfp_url} />
                    <span className="post-username">{username}</span>
                </button>
                <div className="post-header-right">
                    <span className="post-date">
                        {DateTimeToString(getDateFromUUIDv7(id))}
                    </span>
                </div>
            </header>

            {image_url !== undefined && (
                <button className="post-image-wrapper" onClick={onImageClick}>
                    {image_url ? (
                        <img
                            className="post-image"
                            src={image_url}
                            alt="Post"
                        />
                    ) : (
                        <ImagePlaceholder />
                    )}
                </button>
            )}

            <button className="post-body" onClick={onContentClick}>
                <p className="post-content">{content}</p>
            </button>

            <footer className="post-actions">
                <button
                    className="post-action-btn"
                    onClick={onComment}
                    aria-label="Comment"
                >
                    <CommentIcon />
                    <p className="post-action-text">{comments}</p>
                </button>
                <button
                    className="post-action-btn"
                    onClick={onLike}
                    aria-label="Like"
                >
                    <HeartIcon />
                    <p className="post-action-text">{likes}</p>
                </button>
                <button
                    className="post-action-btn"
                    onClick={onBookmark}
                    aria-label="Bookmark"
                >
                    <BookmarkIcon />
                    <p className="post-action-text">{bookmarks}</p>
                </button>
                <button
                    className="post-action-btn"
                    onClick={onShare}
                    aria-label="Share"
                >
                    <ShareIcon />
                </button>
            </footer>
        </article>
    );
}

type PostFeedProps = {
    posts: Post[];
};

export function PostFeed({ posts }: PostFeedProps) {
    return (
        <div className="posts-feed">
            {posts?.map((post) => {
                switch (post.content.type) {
                    case "text":
                        return (
                            <Post
                                id={post.id}
                                username={post.created_by}
                                content={post.content.content}
                                comments={post.comments}
                                likes={post.likes}
                                bookmarks={post.booksmarks}
                            ></Post>
                        );
                    case "image":
                        return;
                    case "text_image":
                        return;
                    case "poll":
                        return;
                }
            })}
        </div>
    );
}
