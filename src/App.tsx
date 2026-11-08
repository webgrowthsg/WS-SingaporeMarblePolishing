import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RestorationPage } from "./pages/RestorationPage";
import { GrindingPage } from "./pages/GrindingPage";
import { SealingPage } from "./pages/SealingPage";
import { HDBPage } from "./pages/HDBPage";
import { CondoPage } from "./pages/CondoPage";
import { CommercialPage } from "./pages/CommercialPage";
import { CostPage } from "./pages/CostPage";
import { AboutPage } from "./pages/AboutPage";
import { QuotePage } from "./pages/QuotePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { routeRegistry } from "./lib/routeRegistry";

const pageMap: Record<string, React.ComponentType> = {
  home: HomePage,
  restoration: RestorationPage,
  grinding: GrindingPage,
  sealing: SealingPage,
  hdb: HDBPage,
  condo: CondoPage,
  commercial: CommercialPage,
  cost: CostPage,
  about: AboutPage,
  quote: QuotePage,
  privacy: PrivacyPage,
  terms: TermsPage,
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routeRegistry.map((route) => {
          const Component = pageMap[route.id];
          if (!Component) return null;
          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
