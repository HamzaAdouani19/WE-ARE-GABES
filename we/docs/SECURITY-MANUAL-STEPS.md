# Security manual steps

These settings require an authorized administrator in the Supabase dashboard.
No dashboard settings or migrations were changed automatically.

## Supabase Auth

1. In **Authentication → Multi-Factor Authentication**, enable TOTP MFA and
   require MFA for administrator accounts (and the appropriate assurance level
   for privileged actions).
2. In **Authentication → Rate Limits**, review and enable appropriate limits
   for sign-in, token, and OTP requests.
3. In **Authentication → Bot and Abuse Protection**, configure a CAPTCHA
   provider and enable CAPTCHA for the relevant authentication flows. Add its
   public site key to the client configuration and its secret key only to the
   Supabase dashboard; never commit the secret.

Dashboard labels can vary by Supabase version. Confirm the settings are active
for the production Auth project.

## Check repository history for `.env.local`

From the repository root, run:

```powershell
git log --all -- .env.local
```

If any commits are listed, treat the file's values as potentially exposed:
rotate any secrets, then follow the repository's approved history-removal
process. Do not print or paste the file contents into an issue or chat.

## Review and apply migrations

Review the two Phase 2 migration files, back up the project as appropriate, and
apply them through the chosen Supabase migration workflow. They were added as
files only and were not applied to any Supabase project.
