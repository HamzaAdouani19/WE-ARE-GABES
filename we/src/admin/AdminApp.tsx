import { useState } from "react";

import { AdminAuthProvider, useAdminAuth } from "./AdminAuthContext";
import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./components/AdminLayout";

import Overview from "./pages/Overview";
import Places from "./pages/Places";
import PlaceEditor from "./pages/PlaceEditor";
import Stories from "./pages/Stories";
import MediaLibrary from "./pages/MediaLibrary";
import Translations from "./pages/Translations";
import Delegations from "./pages/Delegations";
import Dimensions from "./pages/Dimensions";
import Settings from "./pages/Settings";
import './admin.css';
export type AdminSection =
  | "overview"
  | "places"
  | "place-editor"
  | "stories"
  | "media"
  | "translations"
  | "delegations"
  | "dimensions"
  | "settings";

function AdminContent() {
  const { status, profile, signOut } = useAdminAuth();

  const [activeSection, setActiveSection] = useState<AdminSection>("overview");

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  if (status === "loading") {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Loading CMS...</p>
      </div>
    );
  }

  if (status === "unauthenticated" || !profile) {
    return <AdminLogin />;
  }

  function openCreatePlace() {
    setSelectedPlaceId(null);
    setActiveSection("place-editor");
  }

  function openEditPlace(placeId: string) {
    setSelectedPlaceId(placeId);
    setActiveSection("place-editor");
  }

  function closePlaceEditor() {
    setSelectedPlaceId(null);
    setActiveSection("places");
  }

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;

      case "places":
        return <Places onCreate={openCreatePlace} onEdit={openEditPlace} />;

      case "place-editor":
        return (
          <PlaceEditor placeId={selectedPlaceId} onBack={closePlaceEditor} />
        );

      case "stories":
        return <Stories onEditPlace={openEditPlace} />;

      case "media":
        return <MediaLibrary />;

      case "translations":
        return <Translations />;

      case "delegations":
        return <Delegations />;

      case "dimensions":
        return <Dimensions />;

      case "settings":
        return <Settings />;

      default:
        return <Overview />;
    }
  };

  return (
    <AdminLayout
      profile={profile}
      activeSection={activeSection}
      onNavigate={setActiveSection}
      onSignOut={signOut}
    >
      {renderSection()}
    </AdminLayout>
  );
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
}
