import { Navigate, useSearchParams } from "react-router-dom";
import { SearchFilterBars, TutorialCard } from "../components";
import { useTutorialsContext } from "../context";
import { useTutorialsHook } from "../hooks";
import { PageLayout, PageCard, LoadingSpinner } from "/common/components";
import { useErrorContext } from "../../error-boundaries/context";

export function TutorialsList() {
  const { getAllTutorials } = useTutorialsHook();
  const { quickFilter } = useTutorialsContext();
  const [searchParams] = useSearchParams();
  const { handleError } = useErrorContext();

  const [field, sort, page, per_page] = [
    searchParams.get("field") || quickFilter.field,
    searchParams.get("sort") || quickFilter.sort,
    searchParams.get("page") || quickFilter.page,
    searchParams.get("per_page") || quickFilter.per_page,
  ];

  const { data, isLoading, isValidating, error } = getAllTutorials({
    ...(field && { field: field }),
    ...(sort && { sort: sort }),
    ...(page && { page: page }),
    ...(per_page && { per_page: per_page }),
  });

  if (isLoading || isValidating) return <LoadingSpinner />;
  if (error) {
    handleError(error);
    return <Navigate to="/error" />;
  }

  const {
    data: { tutorials },
  } = data;

  return (
    <PageLayout>
      <SearchFilterBars />
      <PageCard>
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial._id} tutorial={tutorial} />
        ))}
      </PageCard>
    </PageLayout>
  );
}
