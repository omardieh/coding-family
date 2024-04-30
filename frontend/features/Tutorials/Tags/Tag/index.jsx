import { useEffect } from "react";
import useTutorialsHook from "/features/Tutorials/hook";
import { Link, useParams } from "react-router-dom";

export default function TutorialsTagsTag() {
  const { slug } = useParams();

  const { data: tag, error, loading, getTutorialsByTag } = useTutorialsHook();

  useEffect(() => {
    getTutorialsByTag(slug);
  }, []);

  return (
    <div>
      {tag?.tutorials?.map((tutorial) => (
        <Link key={tutorial.slug} to={`/tutorials/${tutorial.slug}`}>
          {tutorial.title}
        </Link>
      ))}
    </div>
  );
}
