from invoke import task
import boto3
import fileinput

@task
def start(c):
    """
    Starts the development containers
    """
    c.run('lando start')

@task
def update(c, site='demoplus'):
    """
    Pull down and update all content, including database and files.
    """
    c.run('lando db-import dumps/{}.database.sql'.format(site))
    drush(c, 'cr')

@task
def savedb(c, site='demoplus'):
    c.run('lando db-export dumps/{}.database.sql'.format(site))
    c.run('gunzip -f dumps/{}.database.sql.gz'.format(site))

@task(post=[start, update])
def setup(c):
    c.run('cp web/sites/default/example.settings.local.php web/sites/default/settings.local.php')

@task(help={
    'command':'The command to run through drush. Multiple parameters can be passed in quotes. Example : `inv drush "updb -y"`'
})
def drush(c, command):
    """
    Pipes drush commands into the container
    """
    c.run("lando drush {}".format(command), pty=True)

@task
def solrconfig(c):
    c.run("lando drush solr-gsc solr ../solr-config.zip")
    c.run("lando ssh -c 'unzip solr-config.zip -d solr-config'")
    c.run("touch solr-config/mapping-ISOLatin1Accent.txt")
    c.run("touch solr-config/synonyms.txt")
    c.run("touch solr-config/stopwords.txt")
    c.run("touch solr-config/protwords.txt")
    c.run("lando ssh -s search -c 'solr create_core -c orange -d solr-config'")
    c.run("rm solr-config -rf")

