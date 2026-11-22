
import { useEffect, useState } from 'react';
import {
  Settings as SettingsIcon,
  Database,
  User,
  Languages,
  ShieldCheck,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAdminAuth } from '../AdminAuthContext';

export default function Settings() {
  const { profile, signOut } = useAdminAuth();

  const [connectionStatus, setConnectionStatus] = useState<
    'checking' | 'connected' | 'error' | 'not-configured'
  >('checking');

  const [connectionMessage, setConnectionMessage] = useState('');

  const checkConnection = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setConnectionStatus('not-configured');
      setConnectionMessage('Environment variables are missing.');
      return;
    }

    setConnectionStatus('checking');
    setConnectionMessage('');

    const { error } = await supabase
      .from('admin_profiles')
      .select('user_id')
      .limit(1);

    if (error) {
      setConnectionStatus('error');
      setConnectionMessage(error.message);
      return;
    }

    setConnectionStatus('connected');
    setConnectionMessage('Supabase is connected and responding.');
  };

  useEffect(() => {
    void checkConnection();
  }, []);

  const statusLabel = {
    checking: 'Checking connection...',
    connected: 'Connected',
    error: 'Connection error',
    'not-configured': 'Not configured',
  };

  const statusClass = {
    checking: 'admin-status-neutral',
    connected: 'admin-status-success',
    error: 'admin-status-error',
    'not-configured': 'admin-status-error',
  };

  return (
    <div className="admin-settings">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">WORKSPACE</span>
          <h1>Settings</h1>
          <p>Manage your CMS workspace and account information.</p>
        </div>
      </div>

      <section className="admin-settings-section">
        <div className="admin-settings-section-heading">
          <div className="admin-settings-icon">
            <SettingsIcon size={19} />
          </div>
          <div>
            <h2>Project information</h2>
            <p>General information about this CMS.</p>
          </div>
        </div>

        <div className="admin-settings-list">
          <div className="admin-settings-row">
            <span>Project name</span>
            <strong>WE ARE GABÈS</strong>
          </div>

          <div className="admin-settings-row">
            <span>Platform</span>
            <strong>Content Management System</strong>
          </div>

          <div className="admin-settings-row">
            <span>Frontend</span>
            <strong>React + TypeScript + Vite</strong>
          </div>

          <div className="admin-settings-row">
            <span>Backend</span>
            <strong>Supabase</strong>
          </div>
        </div>
      </section>

      <section className="admin-settings-section">
        <div className="admin-settings-section-heading">
          <div className="admin-settings-icon">
            <Database size={19} />
          </div>
          <div>
            <h2>Database connection</h2>
            <p>Check the connection between the CMS and Supabase.</p>
          </div>
        </div>

        <div className="admin-settings-connection">
          <div>
            <span className="admin-settings-label">Connection status</span>

            <div className="admin-settings-status">
              <span className={statusClass[connectionStatus]}>
                {statusLabel[connectionStatus]}
              </span>
            </div>

            {connectionMessage && (
              <p className="admin-settings-description">
                {connectionMessage}
              </p>
            )}
          </div>

          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => void checkConnection()}
            disabled={connectionStatus === 'checking'}
          >
            <RefreshCw size={15} />
            Check again
          </button>
        </div>
      </section>

      <section className="admin-settings-section">
        <div className="admin-settings-section-heading">
          <div className="admin-settings-icon">
            <User size={19} />
          </div>
          <div>
            <h2>Administrator account</h2>
            <p>Information about your current session.</p>
          </div>
        </div>

        <div className="admin-settings-list">
          <div className="admin-settings-row">
            <span>Display name</span>
            <strong>{profile?.displayName || 'Administrator'}</strong>
          </div>

          <div className="admin-settings-row">
            <span>Email address</span>
            <strong>{profile?.email || 'Not available'}</strong>
          </div>

          <div className="admin-settings-row">
            <span>Access level</span>
            <span className="admin-settings-role">
              <ShieldCheck size={15} />
              Administrator
            </span>
          </div>
        </div>

        <div className="admin-settings-danger-zone">
          <div>
            <strong>Sign out</strong>
            <p>End your current administrator session.</p>
          </div>

          <button
            type="button"
            className="admin-danger-action"
            onClick={() => void signOut()}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </section>

      <section className="admin-settings-section">
        <div className="admin-settings-section-heading">
          <div className="admin-settings-icon">
            <Languages size={19} />
          </div>
          <div>
            <h2>Content languages</h2>
            <p>Languages currently supported by the CMS.</p>
          </div>
        </div>

        <div className="admin-settings-languages">
          <div>
            <strong>EN</strong>
            <span>English</span>
          </div>

          <div>
            <strong>AR</strong>
            <span>العربية</span>
          </div>

          <div>
            <strong>FR</strong>
            <span>Français</span>
          </div>
        </div>
      </section>
    </div>
  );
}
