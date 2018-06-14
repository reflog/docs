import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, jamo, rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { Code, InlineCode } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Deploying Static Apps',
  description: 'All about Static App deployments on Now',
  date: '09 March 2017',
  authors: [leo, jamo, rauchg],
  editUrl: 'pages/docs/deployment-types/static.js',
})(markdown(components)`

${<Now color="#000"/>} comes with built-in support for static deployments. It considers all projects that don't have a \`Dockerfile\`, nor a \`package.json\`, a static deployment.

Deploying such a static project is still as easy as running a single command:

${<TerminalInput>now</TerminalInput>}

## Under the Hood

Static deployments running on ${<Now color="#000"/>} are powered by [serve-handler](https://github.com/zeit/serve-handler), which you can download, fork, extend, and
even operate locally during development by
importing the module itself into an [existing server](https://github.com/zeit/serve#api) or
using its [command line interface](https://github.com/zeit/serve).

What does this mean for your team and your business?

Great user experience with zero lock-in.

## Customization

In order to change the default behaviour of your static deployment running on ${<Now color="#000"/>}, you only need to
create a ${<InlineCode>now.json</InlineCode>} file with a ${<InlineCode>static</InlineCode>} property that
holds any of [these values](https://github.com/zeit/serve-handler#options).

Here is an example for forcing [trailing slashes](https://github.com/zeit/serve-handler#trailingslash-boolean):

${
  <Code>{`{
  "static": {
    "trailingSlash": true
  }
}`}</Code>
}

Then, once you run \`now\`, we will automatically upload this configuration to ${<Now color="#000"/>} and
adjust the behavior of the deployment accordingly.

Furthermore, when developing locally, [serve](https://github.com/zeit/serve) can be used. If so, the same
configuration file will be read and [serve](https://github.com/zeit/serve) will adapt itself.

## Default Behavior

If you do not overwrite the following configuration properties using a {<InlineCode>now.json</InlineCode>} file, they
will be enabled by default for ${<Now color="#000"/>}:

- ${<InlineCode>renderSingle</InlineCode>} set to ${<InlineCode>true</InlineCode>}
- ${<InlineCode>cleanUrls</InlineCode>} set to ${<InlineCode>true</InlineCode>}
- ${<InlineCode>headers</InlineCode>} contains a ${<InlineCode>ETag</InlineCode>} header for every file
- ${<InlineCode>directoryListing</InlineCode>} set to ${<InlineCode>true</InlineCode>}

You can read more about these properties [here](https://github.com/zeit/serve-handler#options).

In order to receive the contents of directories, errors, and other meta information
as JSON instead of HTML, you can set the following header on your request:

${
<Code>{`Accept: application/json`}</Code>
}

### Deployment Inactivity

Deployments stay around forever if you do not remove them using \`now remove\`, like shown
on [this page](https://zeit.co/docs/features/now-cli#cloud-commands).

Static deployments are **never** put to sleep and are always **quickly accessible**.
`)
