import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchFilterBars from "./SearchFilterBars";
import TutorialCard from "./TutorialCard";
import { useTutorialsContext } from "./context";
import useTutorialsHook from "./hook";
import "./styles.css";
import { PageLayout } from "../../common/components/PageLayout";
import { PageCard } from "../../common/components/PageCard";
import { LoadingSpinner } from "/common/components";

export default function Tutorials() {
  const { data, error, loading, getAllTutorials } = useTutorialsHook();
  const { quickFilter } = useTutorialsContext();
  const [searchParams] = useSearchParams();

  const [field, sort, page, per_page] = [
    searchParams.get("field") || quickFilter.field,
    searchParams.get("sort") || quickFilter.sort,
    searchParams.get("page") || quickFilter.page,
    searchParams.get("per_page") || quickFilter.per_page,
  ];

  useEffect(() => {
    getAllTutorials({
      ...(field && { field: field }),
      ...(sort && { sort: sort }),
      ...(page && { page: page }),
      ...(per_page && { per_page: per_page }),
    });
  }, [field, sort, page, per_page]);

  const renderLoading = () => {
    if (!data?.tutorials || loading) return <LoadingSpinner />;
  };

  const renderTutorials = () => {
    if (data?.tutorials && !loading)
      return (
        <>
          <SearchFilterBars />
          <PageCard>
            {data.tutorials?.map((tutorial) => (
              <TutorialCard key={tutorial._id} tutorial={tutorial} />
            ))}
          </PageCard>
        </>
      );
  };

  return (
    <PageLayout>
      {renderLoading()}
      {renderTutorials()}
    </PageLayout>
  );
}
