import { Route, Routes } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import ScrollToTop from './components/ScrollToTop'
import BackToTopButton from './components/BackToTopButton'
import SiteFooter from './components/SiteFooter'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import LegalCookiesPage from './pages/LegalCookiesPage'
import LegalPrivacyPage from './pages/LegalPrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import BrowseProjectsPage from './pages/BrowseProjectsPage'
import QualityPage from './pages/QualityPage'
import ServicesPage from './pages/ServicesPage'
import AdminProjectsListPage from './pages/admin/AdminProjectsListPage'
import AdminProjectEditorPage from './pages/admin/AdminProjectEditorPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRedirectPage from './pages/admin/AdminRedirectPage'
import { HeaderMetricsProvider, useHeaderMetrics } from './hooks/useHeaderMetrics'

function App() {
  return (
    <HeaderMetricsProvider>
      <AppShell />
    </HeaderMetricsProvider>
  )
}

function AppShell() {
  return (
    <div className="page-shell flex min-h-screen flex-col text-brand-primary">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/browse" element={<BrowseProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal/privacy" element={<LegalPrivacyPage />} />
          <Route path="/legal/cookies" element={<LegalCookiesPage />} />
          <Route path="/admin" element={<AdminRedirectPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/projects" element={<AdminProjectsListPage />} />
            <Route path="/admin/projects/new" element={<AdminProjectEditorPage />} />
            <Route path="/admin/projects/:projectId" element={<AdminProjectEditorPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <BackToTopButton />
    </div>
  )
}

export default App
