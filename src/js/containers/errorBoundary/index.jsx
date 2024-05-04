import { withErrorBoundary } from "~hocs";
import ErrorPage from "./errorPage";

export const ErrorBoundary = withErrorBoundary(() => null);
export const TopLevelErrorBoundary = withErrorBoundary(ErrorPage);
