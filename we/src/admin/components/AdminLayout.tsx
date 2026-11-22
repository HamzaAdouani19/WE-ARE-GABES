
import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  MapPin,
  BookOpen,
  Images,
  Languages,
  Map,
  Layers,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

import type { AdminProfile } from '../../types/gabes';
import type { AdminSection } from '../AdminApp';

interface AdminLayoutProps {
  profile: AdminProfile;
  activeSection: AdminSection;
  onNavigate: (section: AdminSection) => void;
  onSignOut: () => Promise<void>;
  children: ReactNode;
}

const navigation: {
  label: string;
  items: {
    id: AdminSection;
    label: string;
    icon: typeof LayoutDashboard;
  }[];
}[] = [
  {
    label: 'WORKSPACE',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'places', label: 'Places', icon: MapPin },
      { id: 'stories', label: 'Stories', icon: BookOpen },
      { id: 'media', label: 'Media Library', icon: Images },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { id: 'translations', label: 'Translations', icon: Languages },
      { id: 'delegations', label: 'Delegations', icon: Map },
      { id: 'dimensions', label: 'Dimensions', icon: Layers },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

const sectionTitles: Record<AdminSection, string> = {
  overview: 'Overview',
  places: 'Places',
  'place-editor': 'Place Editor',
  stories: 'Stories',
  media: 'Media Library',
  translations: 'Translations',
  delegations: 'Delegations',
  dimensions: 'Dimensions',
  settings: 'Settings',
};

export default function AdminLayout({
  profile,
  activeSection,
  onNavigate,
  onSignOut,
  children,
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await onSignOut();
    } finally {
      setSigningOut(false);
    }
  }

  function navigate(section: AdminSection) {
    onNavigate(section);
    setMobileMenuOpen(false);
  }

  const initials = profile.displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="admin-shell">
      {mobileMenuOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${
          mobileMenuOpen ? 'is-open' : ''
        }`}
      >
        <div className="admin-sidebar-brand">
          <div className="admin-brand-mark">WG</div>

          <div className="admin-brand-copy">
            <strong>WE ARE GABÈS</strong>
            <span>CONTENT STUDIO</span>
          </div>

          <button
            type="button"
            className="admin-mobile-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <div className="admin-sidebar-label">
          MANAGEMENT
        </div>

        <nav className="admin-navigation">
          {navigation.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              <span className="admin-nav-group-label">
                {group.label}
              </span>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`admin-nav-item ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => navigate(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.label}</span>

                    {isActive && (
                      <ChevronRight
                        size={15}
                        className="admin-nav-chevron"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user">
            <div className="admin-avatar">
              {initials || 'AD'}
            </div>

            <div className="admin-user-info">
              <strong>{profile.displayName}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            type="button"
            className="admin-signout-button"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            <LogOut size={17} />
            <span>
              {signingOut ? 'Signing out...' : 'Sign out'}
            </span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-menu"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div>
              <span className="admin-breadcrumb">
                WE ARE GABÈS / ADMIN
              </span>
              <h1>{sectionTitles[activeSection]}</h1>
            </div>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-status-indicator" />
            <span>CMS Workspace</span>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
