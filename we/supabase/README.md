# Supabase setup

## Run migrations

The migration files are ordered by timestamp in `supabase/migrations/`. This
repository currently has no `supabase/config.toml`.

For a local database, run these commands from the `we/` directory:

```powershell
npx supabase init
npx supabase start
npx supabase db reset
```

Run `supabase init` once, only while `supabase/config.toml` is absent. Review the
generated config and ensure its `[db.seed]` section is enabled with
`sql_paths = ['./seed.sql']`; `db reset` resets the local database, reapplies
the migrations, and runs the seed.

To apply pending migrations to a linked project, first review the SQL and back
up important data, then run these commands deliberately:

```powershell
npx supabase link --project-ref <project-ref>
npx supabase db push
```

Do not run `db push` unless the linked project is the intended target. The
seed is sample data for development and should not be run against production.

## Create the first admin

1. In the Supabase dashboard, open **Authentication → Users** and create or
   invite the intended administrator account.
2. In **SQL Editor**, run the following query, replacing the example email with
   the account created above:

   ```sql
   update auth.users
   set raw_app_meta_data =
     coalesce(raw_app_meta_data, '{}'::jsonb)
     || jsonb_build_object('role', 'admin')
   where email = 'admin@example.com'
   returning id, email;
   ```

3. Confirm the query returns the intended user, then have that user sign out
   and sign in again so the refreshed JWT contains
   `app_metadata.role = 'admin'`. The CMS checks this claim for authorization.

Display names are read from the authenticated user's `user_metadata`; the
`admin_profiles` table is not the authorization source.
