import withDoc from '../../../lib/with-doc'

import Caption from '../../../components/text/caption'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'Build-Time Environment Variables and Secrets',
  description: 'Creating and using environment variables and creating and using secret environment variables during the build stage of your Now deployments',
  date: '19 July 2018',
  editUrl: 'pages/docs/features/build-env-and-secrets.md'
}

> If you're looking for information covering Environment Variables and Secrets to use within your app, head over to our guide for [Runtime Env and Secrets](/docs/features/env-and-secrets)

There are multiple stages to deploying your app, for example; installing dependencies. For Now to recognise that your app needs a build step, your app will need a `Dockerfile`.

Having a `Dockerfile` is a brilliant way to configure the process of your app being built so that Now will be able to build your app and then deploy using your configuration.

During your build, you may need information that you do not want to hardcode into your app. In this case, Now supports a method that allows you to give an Environment Variable or Secret for you deployment to use where you need that information.

To use your custom Environment Variables or Secrets in the build process on Now, there are two methods.

### The `now.json` method
You can provide your Now deployment with Environment Variables directly from within your `now.json` configuration file. To do so for the build step, you will need to place this information within the `build.env` property. For example:

```
{
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```
<Caption>Listing the `NODE_ENV` build Environment Variable with the value of `production` within a `now.json` configuration file and within the `build.env` property.</Caption>

### The Now CLI Method
You can use the built in `--build-env` paramter to pass your Environment Variables to the build stage of your Now deployment. For example, the following command will give the `NODE_ENV` Environment Variable the value of `production`.

<TerminalInput>now --build-env NODE_ENV=production</TerminalInput>
<Caption>Setting the `NODE_ENV` build environment variables to have a value of `production` with the Now CLI</Caption>

## Using Secrets
To use secrets with Now in the build stage, we first need to add our secret with the `now secret` command in the Now CLI.

<TerminalInput>now secret add npm-token NPM_TOKEN_VALUE</TerminalInput>
<Caption>Adding the `npm-token` secret to your account or team, with the example of a value</Caption>

We can now use this secret at build-time by passing it as an Environment Variable, using both methods above but by use an `@` symbol before the value.

For example, in a `now.json` configuration, it would looke like this:

```
{
  "build": {
    "env": {
      "NPM_TOKEN": "@npm-token"
    }
  }
}
```
<Caption>Using our `npm-token` that we added to our account or team before with an Environment Variable within a `now.json` configuration.</Caption>

You can also use secrets in the CLI using the same method of using the `@` symbol before the value

Read more about [Secrets within Now](/docs/features/env-and-secrets#securing-env-variables-using-secrets) for more examples and information.

## Env and Secrets in your build with `Dockerfile`
With the information we have already discussed with how to setup environment variables and secrets, now it's time to use them.

By creating a `Dockerfile` we can let Now know that we want a build step for our app. Within that `Dockerfile` we can use our Environment Variables that we setup in previous steps (including those with values associated with Secrets) using the [`ARG` instruction](https://docs.docker.com/engine/reference/builder/#arg).

For example, if we want to use the `NPM_TOKEN` environment variable from our [last step](#using-secrets) we can use the following in a `Dockerfile`:
```
ARG NPM_TOKEN
```
<Caption>Creating an ARG variable with the value of an earlier created environment variable</Caption>

The `Dockerfile` and Now will associate the value of that ARG to the `NPM_TOKEN` environment variable. We can then subsequently use this value by referencing the ARG with the same name with a `$` prefixing it.

```
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
```
<Caption>Using an environment variable and ARG in conjunction to output a valid `.npmrc` for private npm</Caption>

## By Example
Now that we've gone through the steps and methods of using environment variables and secrets in the build step, let's take a look at some examples.

### Private npm
To use private npm packages, npm requires that we provide an auth token. We don't always want to hardcode this auth token, so we can use Environment Variables and Secrets to manage this.

To start, let's get a new token. npm will give us a new token using the command `npm token create --read-only`, but we probably don't want to share that token around. To protect the token from getting out for anyone else to use, we can use the `now secret` command.

<TerminalInput>now secret add npm-token YOUR_TOKEN</TerminalInput>
<Caption>Adding the `npm-token` secret to your account or team.</Caption>

Once our secret is added, we can use that secret in our `now.json` configuration.
```
{
  "build": {
    "env": {
      "NPM_TOKEN": "@npm-token"
    }
  }
}
```
<Caption>Note that you can also use the [Now CLI method](#the-now-cli-method) for this also.</Caption>

> Note that you can extend your `now.json` configuration beyond just `build.env`. [Read more](/docs/features/configuration)!

Now that we have our environment variable `NPM_TOKEN` set to the value of our secret contained npm auth token, we can go on to use it!

For this example, we are going to install dependencies within a [static app build](/docs/features/static-builds). Within our `Dockerfile`, we will use an `ARG` instruction that relates to the recently created `NPM_TOKEN` environment variable.

```
FROM mhart/alpine-node

# Retrieve and relate to our environment variable
ARG NPM_TOKEN

# Print into `.npmrc` with a string using our `NPM_TOKEN` ARG
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

WORKDIR /usr/src

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn
COPY . .

RUN yarn build &&
  yarn export -o /public
```
<Caption>Note that the usage of the ARG variable starts with a `$`. This is necessary for Docker to recognise this as an ARG variable.</Caption>

With the `Dockerfile` complete, we can now go on to deploying with Now:

<TerminalInput>now</TerminalInput>

Through the deployment, our build will progress with our configuration including that of our environment variables and secrets!

export default withDoc({...meta})(({children}) => <>{children}</>)
