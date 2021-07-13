# Local Development for Urban Hipster
Use `inv devconfig` to automatically pull and load Urban Hipster config files. This task will only work if you've been granted access to the [Urban Hipster config repository](https://git.acromedia.com/teams/marketing/urban-hipster/urban-hipster-config). Use `inv devconfig site=demo` to import **BASE** config instead of **PLUS**.  
You can login with username and password as `demoadmin`.
- NOTE: demoadmin does have some restrictions. If you'd prefer to login as a full admin, use Drush from the `/web` root to get a one-time admin login. Drush 9 is included in the vendor dir, so run `../vendor/drush/drush/drush uli`.

# Updating the Urban Hipster demo site
When updating both **PLUS** and **BASE** sites, be sure to push any configuration changes into the [Urban Hipster config repository](https://git.acromedia.com/teams/marketing/urban-hipster/urban-hipster-config).  
For **PLUS**, you should also update the [change log page](https://commerceplus.acromedia.com/change-log) as needed.

## Updating Performance Enhanced PLUS
The performance_update branch contains the new version of PLUS with varnish and all that performance enhancement goodness. This branch should be treated separately and the deployment for it is tied to this branch. The process for updating is still the same as the regular PLUS site, but note the following:
- `ssh acro@commerceplus-new.acromedia.com`
- Site is in `www/cpback`
