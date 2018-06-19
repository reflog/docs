import withDoc from '../../../lib/with-doc'

import { sergio } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'Building a Single Page Application with Create React App',
  description: 'Creating a single page web app with create-react-app and deploying it with Now',
  date: '23 Feb 2017',
  authors: [sergio],
  editUrl: 'pages/docs/examples/create-react-app.md'
}

[Create React App](https://github.com/facebookincubator/create-react-app) is a boilerplate tool used to create Single Page Applications with React.js without build configuration. Facebook created CRA and made it the official way to start a new React application.

In this page we're going to focus on how to deploy a Single Page Application made with Create React App to ${<Now color="#000"/>}. If you want to learn how to use this boilerplate tool we recommend you to read their [repository's README](https://github.com/facebookincubator/create-react-app/blob/master/README.md).

## Setup

Now static deployments made use of [serve-handler](https://github.com/zeit/serve-handler) in their core. This let us define custom configuration for our static deployment. In our case, since we are going to deploy a Single Page Application we need to define every non-found path to return our `index.html` in order to let our SPA use a router without hashbangs.

```
{
  "type": "static",
  "files": [
    "./build"
  ],
  "static": {
    "public": "/build",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

The `type` key define the type of deployment. In this case due the existence of a `package.json` Now will consider it a Node.js deployment, with this it can be forced to be a `static` one.

The `files` key define which files Now should upload to the deployment, in this case only the `./build` directory will be uploaded.

The `public` key tells Now to only serve the `/build` directory as if it was the root.

The `rewrites` key tells Now to reply with `/index.html` for any possible path if it didn't found a matching file. This is what enables your static deployment to work as a Single Page Application.

## Deploying the application

Once we did that we can deploy our application with the following command:

<TerminalInput>npm run build && now</TerminalInput>

Once the application is built and ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your freshly created Single Page Application.

But in the case of a real application (not used for testing purposes), you would now have to [assign an alias](/docs/features/aliases) to it.

export default withDoc({...meta})(({children}) => <>{children}</>)
