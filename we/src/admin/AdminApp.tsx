import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import {
  Activity, Compass, FileText, Image, LayoutDashboard, LogOut,
  MapPin, Menu, Settings, ShieldCheck, Tags, Languages, Plus, Search,
  RefreshCw, X,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import './admin.css';

type Section = 'overview' | 'places' | 'stories' | 'media' | 'translations' | 'delegations' | 'dimensions' | 'settings';

const navigation: Array<{ id: Section; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'places', label: 'Places', icon: MapPin },
  { id: 'stories', label: 'Stories & Content', icon: FileText },
  { id: 'media', label: 'Media Library', icon: Image },
  { id: 'translations', label: 'Translations', icon: Languages },
  { id: 'delegations', label: 'Delegations', icon: Compass },
  { id: 'dimensions', label: 'Dimensions', icon: Tags },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface PlaceRow {
  id: string;
  slug: string;
  publication_status: 'draft' | 'published';
  created_at?: string;
  place_translations?: Array<{ locale: string; title: string }>;
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [section, setSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginBusy, setLoginBusy] = useState(false);
  const [error, setError] = useState('');
  const [places, setPlaces] = useState<PlaceRow[]>([]);
  const [placesBusy, setPlacesBusy] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = user?.app_metadata?.role === 'admin';

  useEffect(() => {
    if (session && isAdmin && section === 'places') void loadPlaces();
    // loadPlaces is intentionally triggered when the Places section becomes active.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAdmin, section]);

  async function loadPlaces() {
    if (!supabase) return;
    setPlacesBusy(true);
    setError('');
    const { data, error: queryError } = await supabase
      .from('places')
      .select('id, slug, publication_status, created_at, place_translations(locale,title)')
      .order('created_at', { ascending: false });
    if (queryError) setError(queryError.message);
    else setPlaces((data ?? []) as PlaceRow[]);
    setPlacesBusy(false);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setLoginBusy(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
    setLoginBusy(false);
  }

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSection('overview');
  }

  if (!isSupabaseConfigured || !supabase) {
    return (
      <div className="admin-screen">
        <div className="admin-auth-card">
          <div className="admin-brand-mark"><Compass size={22} /></div>
          <p className="admin-eyebrow">WE ARE GABÈS · CMS</p>
          <h1>Connect your workspace</h1>
          <p className="admin-muted">Supabase is not configured yet. Add the two public project variables to <code>.env.local</code>, then restart the Vite server.</p>
          <pre className="admin-env">VITE_SUPABASE_URL=your-project-url{ '\n' }VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key</pre>
        </div>
      </div>
    );
  }

  if (checking) {
    return <div className="admin-screen"><div className="admin-loading"><span className="admin-spinner" /> Checking secure session…</div></div>;
  }

  if (!session) {
    return (
      <div className="admin-screen">
        <form className="admin-auth-card" onSubmit={handleLogin}>
          <div className="admin-brand-mark"><Compass size={22} /></div>
          <p className="admin-eyebrow">WE ARE GABÈS · PRIVATE CMS</p>
          <h1>Welcome back</h1>
          <p className="admin-muted">Sign in with your administrator account.</p>
          <label className="admin-field">Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" /></label>
          <label className="admin-field">Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" /></label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-primary-btn" disabled={loginBusy}>{loginBusy ? 'Signing in…' : 'Sign in'}</button>
          <p className="admin-footnote"><ShieldCheck size={14} /> Private administrator access only</p>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-screen">
        <div className="admin-auth-card">
          <div className="admin-brand-mark"><ShieldCheck size={22} /></div>
          <p className="admin-eyebrow">ACCESS RESTRICTED</p>
          <h1>Administrator role required</h1>
          <p className="admin-muted">This account is authenticated but is not authorized to access the CMS.</p>
          <button className="admin-secondary-btn" onClick={handleLogout}>Sign out</button>
        </div>
      </div>
    );
  }

  const filteredPlaces = places.filter((place) => {
    const title = place.place_translations?.find((item) => item.locale === 'en')?.title ?? place.slug;
    return (title + ' ' + place.slug).toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-brand-mark small"><Compass size={18} /></div>
          <div><strong>WE ARE GABÈS</strong><span>CONTENT STUDIO</span></div>
          <button className="admin-icon-btn mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <p className="admin-nav-caption">WORKSPACE</p>
        <nav className="admin-nav">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button key={id} className={section === id ? 'active' : ''} onClick={() => { setSection(id); setSidebarOpen(false); }}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-user-chip"><div className="admin-avatar">{(user.email ?? 'A').slice(0, 1).toUpperCase()}</div><div><strong>Administrator</strong><span>{user.email}</span></div></div>
          <button className="admin-logout" onClick={handleLogout}><LogOut size={17} /> Sign out</button>
        </div>
      </aside>

      {sidebarOpen && <button className="admin-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-btn mobile-only" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <div><span className="admin-breadcrumb">Workspace /</span> <strong>{navigation.find((item) => item.id === section)?.label}</strong></div>
          <div className="admin-topbar-right"><span className="admin-live-dot" /> <span>Private workspace</span></div>
        </header>
        <div className="admin-content">
          {section === 'overview' && <Overview onOpenPlaces={() => setSection('places')} />}
          {section === 'places' && (
            <>
              <div className="admin-page-heading"><div><p className="admin-eyebrow">CONTENT MANAGEMENT</p><h1>Places</h1><p className="admin-muted">Manage the destinations featured across WE ARE GABÈS.</p></div><button className="admin-primary-btn compact" onClick={() => setError('Place editor is the next implementation step. The database foundation is being prepared.') }><Plus size={17} /> Add place</button></div>
              <div className="admin-panel">
                <div className="admin-table-toolbar"><div className="admin-search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search places…" /></div><button className="admin-secondary-btn compact" onClick={() => void loadPlaces()}><RefreshCw size={15}/> Refresh</button></div>
                {error && <p className="admin-error inline">{error}</p>}
                {placesBusy ? <div className="admin-empty"><span className="admin-spinner"/> Loading places…</div> : filteredPlaces.length ? (
                  <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>PLACE</th><th>SLUG</th><th>STATUS</th></tr></thead><tbody>{filteredPlaces.map((place) => <tr key={place.id}><td><strong>{place.place_translations?.find((item) => item.locale === 'en')?.title ?? 'Untitled place'}</strong></td><td>{place.slug}</td><td><span className={`admin-status ${place.publication_status}`}>{place.publication_status}</span></td></tr>)}</tbody></table></div>
                ) : <div className="admin-empty"><MapPin size={24}/><strong>No places found</strong><span>When place records are available, they will appear here.</span></div>}
              </div>
            </>
          )}
          {section !== 'overview' && section !== 'places' && <ComingSoon section={section} />}
        </div>
      </main>
    </div>
  );
}

function Overview({ onOpenPlaces }: { onOpenPlaces: () => void }) {
  const [stats, setStats] = useState({ places: 0, published: 0, drafts: 0, delegations: 0, dimensions: 0 });
  const [busy, setBusy] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      if (!supabase) return;
      const [places, published, drafts, delegations, dimensions] = await Promise.all([
        supabase.from('places').select('*', { count: 'exact', head: true }),
        supabase.from('places').select('*', { count: 'exact', head: true }).eq('publication_status', 'published'),
        supabase.from('places').select('*', { count: 'exact', head: true }).eq('publication_status', 'draft'),
        supabase.from('delegations').select('*', { count: 'exact', head: true }),
        supabase.from('cultural_dimensions').select('*', { count: 'exact', head: true }),
      ]);
      if (!active) return;
      setStats({ places: places.count ?? 0, published: published.count ?? 0, drafts: drafts.count ?? 0, delegations: delegations.count ?? 0, dimensions: dimensions.count ?? 0 });
      setBusy(false);
    }
    void load();
    return () => { active = false; };
  }, []);
  const cards = [
    { label: 'Total places', value: stats.places, icon: MapPin },
    { label: 'Published', value: stats.published, icon: Activity },
    { label: 'Drafts', value: stats.drafts, icon: FileText },
    { label: 'Delegations', value: stats.delegations, icon: Compass },
    { label: 'Dimensions', value: stats.dimensions, icon: Tags },
  ];
  return (
    <>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">YOUR REGION, YOUR STORIES</p><h1>Overview</h1><p className="admin-muted">A clear view of the content powering your digital destination.</p></div><button className="admin-secondary-btn compact" onClick={onOpenPlaces}>Manage content <span>→</span></button></div>
      <div className="admin-stats-grid">{cards.map(({ label, value, icon: Icon }) => <div className="admin-stat-card" key={label}><div className="admin-stat-top"><span>{label}</span><Icon size={18}/></div><strong>{busy ? '—' : value}</strong><span className="admin-stat-note">Live database count</span></div>)}</div>
      <div className="admin-panel admin-welcome-panel"><div className="admin-welcome-icon"><Compass size={22}/></div><div><h2>Welcome to your content studio</h2><p>Manage places, stories, imagery and translations from one private workspace. Your public website remains a separate experience.</p></div></div>
    </>
  );
}

function ComingSoon({ section }: { section: Section }) {
  const item = navigation.find((entry) => entry.id === section);
  const Icon = item?.icon ?? LayoutDashboard;
  return <div className="admin-page-heading"><div><p className="admin-eyebrow">CONTENT STUDIO</p><h1>{item?.label}</h1><p className="admin-muted">This module is reserved in the CMS architecture and will be implemented in the next stage.</p></div><div className="admin-coming-card"><Icon size={26}/><strong>{item?.label}</strong><span>Module foundation pending</span></div></div>;
}
