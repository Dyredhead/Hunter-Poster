import Post from "@/components/Post";

export default function ForYouPage() {
    const content =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a sapien justo. Nunc ultrices ligula ut erat tristique, ut fringilla nisi malesuada. Aenean tincidunt nunc mauris, vitae varius nunc tincidunt at. Pellentesque ornare ultrices aliquam. Etiam auctor dictum ex vitae venenatis. Sed aliquet metus at tellus pellentesque aliquet. Donec nec augue eget risus interdum mattis in sagittis orci. Morbi at tortor tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam faucibus orci eros, ut semper augue luctus et. Donec id ligula in ex ullamcorper vestibulum. Aenean quis nibh eget nibh cursus imperdiet. Pellentesque lorem risus, auctor quis lobortis quis, dapibus vel augue. Donec vulputate quam eu dolor iaculis pellentesque.";
    return (
        <div className="posts-feed">
            <Post
                id={"019b7712-84c9-7d10-af7c-e46271e1abd9"}
                username={"john"}
                content={content}
                comments={1}
                likes={2}
                bookmarks={3}
            ></Post>
            <Post
                id={"019e9b89-e4b6-7dff-8807-02a5f19fc737"}
                username={"john"}
                content={content}
                comments={4}
                likes={5}
                bookmarks={6}
            ></Post>
        </div>
    );
}
