import { useEffect } from "react";
import useTutorialsHook from "/features/Tutorials/hook";
import { Link } from "react-router-dom";

export default function TutorialsTags() {
  const { data: tags, error, loading, getTutorialsTags } = useTutorialsHook();

  useEffect(() => {
    getTutorialsTags();
  }, []);

  console.log(tags);
  return (
    <div>
      {tags?.map((tag) => (
        <Link key={tag.slug} to={`/tutorials/tags/${tag.slug}`}>
          {tag.label}
        </Link>
      ))}
    </div>
  );
}
