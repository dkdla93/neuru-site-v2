import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  date: string;
  url: string;
}

interface BoardListProps {
  posts: Post[];
  emptyMessage?: string;
}

export default function BoardList({ posts, emptyMessage = '게시글이 없습니다.' }: BoardListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-[14px] text-[#aaa]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-[#e0d8cc]">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={post.url}
            className="flex items-center justify-between py-4 hover:text-[#4a7c59] transition-colors group"
          >
            <span className="text-[14px] text-[#2c2c2c] group-hover:text-[#4a7c59] transition-colors pr-4">
              {post.title}
            </span>
            <span className="text-[12px] text-[#aaa] flex-shrink-0">{post.date}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
