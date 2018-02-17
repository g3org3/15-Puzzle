const name = require('./package.json').name
const version = require('./package.json').version
const registry = 'registry.jorgeadolfo.com'
const image = `${registry}/${name}`

module.exports = {
  scripts: {
    default: 'npm start',
    test: {
      default: 'nps lint && nps t.m',
      mocha: 'mocha -t 5000'
    },
    coverage: 'nyc nps t',
    lint: 'standard --verbose | snazzy',
    docker: {
      build: {
        pre: 'python pkg.py',
        all: 'nps d.b.l && nps d.b.v',
        latest: `nps d.b.pre && docker build -f docker/Dockerfile -t ${image}:latest . `,
        version: `nps d.b.pre && docker build -f docker/Dockerfile -t ${image}:${version} . `
      },
      push: {
        all: 'nps d.p.l && nps d.p.v',
        latest: `docker push ${image}:latest`,
        version: `docker push ${image}:${version}`
      },
      run: `docker run -it --rm -p 3004:1338 --name test-${name} ${image}:latest`,
      rollback: {
        set: `docker tag ${image}:${version} ${image}:rollback && docker push ${image}:rollback`,
        change: `docker tag ${image}:rollback ${image}:latest`
      }
    },
    dev: 'nps d.b.l && nps d.r',
    deploy: 'ansible-playbook -v deploy/update.yml',
    rollback: 'nps d.r.c && nps deploy',
    full: 'nps d.b.a && nps d.p.a && nps deploy'
  }
}
