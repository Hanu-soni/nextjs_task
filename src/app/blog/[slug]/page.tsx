// app/blog/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  body: string;
}

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts: BlogPost[] = await res.json();

  return posts.map((post) => ({
    slug: post.id.toString(),
  }));
}

export const dynamicParams = true; // enables fallback for paths not in generateStaticParams
export const revalidate = 10;       // ISR: revalidate every 10 seconds

async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);

  if (!res.ok) return null;

  return res.json();
}




export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) return notFound(); ;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4 text-gray-700">{post.body}</p>
    </main>
  );
}






//set dynamic meta data per post
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug);
  console.log(post,"................57");
  console.log(params.slug,"........58");

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.body.slice(0, 160), // SEO meta description
    openGraph: {
      title: post.title,
      description: post.body.slice(0, 160),
      type: 'article',
      url: `https://yourdomain.com/blog/${params.slug}`,
      images: [
        {
          url: 'https://via.placeholder.com/800x400', // Replace with real CMS image
          width: 800,
          height: 400,
          alt: post.title,
        },
      ],
    },
  };
}
