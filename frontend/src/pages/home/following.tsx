import Post from "@/components/Post";

export default function page() {
    const content =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a sapien justo. Nunc ultrices ligula ut erat tristique, ut fringilla nisi malesuada. Aenean tincidunt nunc mauris, vitae varius nunc tincidunt at. Pellentesque ornare ultrices aliquam. Etiam auctor dictum ex vitae venenatis. Sed aliquet metus at tellus pellentesque aliquet. Donec nec augue eget risus interdum mattis in sagittis orci. Morbi at tortor tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam faucibus orci eros, ut semper augue luctus et. Donec id ligula in ex ullamcorper vestibulum. Aenean quis nibh eget nibh cursus imperdiet. Pellentesque lorem risus, auctor quis lobortis quis, dapibus vel augue. Donec vulputate quam eu dolor iaculis pellentesque.";
    return (
        <div className="posts-feed">
            <Post
                id={1}
                username={"john"}
                created_at={new Date(2026, 4, 1, 12, 30)}
                content={content}
                comments={23}
                likes={52}
                bookmarks={5}
            ></Post>
            <Post
                id={2}
                username={"john"}
                created_at={new Date(2026, 4, 1, 6, 30)}
                content={content}
                comments={0}
                likes={0}
                bookmarks={0}
            ></Post>
        </div>
    );
}
