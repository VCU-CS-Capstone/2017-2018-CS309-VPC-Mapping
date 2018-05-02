# VCU Senior Capstone

[![CircleCI](https://circleci.com/gh/StevenMHernandez/capstone.svg?style=svg)](https://circleci.com/gh/StevenMHernandez/capstone)

Sponsor: Capital One

Goal: Provide operational insight to AWS service architecture.

## Project Setup

```
git clone https://github.com/StevenMHernandez/capstone.git
cd capstone
npm install
```

## Run Project

```
# run/manually test diagram builder code
node src/index.js

# or, run/manually test the slack Message sender code
# notice, you must change the CHATBOT_TOKEN to your specific chatbot's token.
CHATBOT_TOKEN=XXXX node src/slackMessageSender/index.js
```

## Run Tests

```
npm test
```

## Update Dependencies

Sometimes, we might add a new library through npm. To download this new library, run `npm install` once again.

## Resources

[Project Wiki](https://github.com/StevenMHernandez/capstone/wiki) contains information on setting things up for the project.
(For example setting up NPM, AWS, etc)
If we as a group need to explain anything to one another how to do something,
we should create a page in the wiki so that the whole group can learn.

## Hosting Chatbot

Chatbot logic is "hosted" using AWS Lambda. Deployment and configuration is handled by [the serverless framework](https://github.com/serverless/serverless)

With sufficient credentials, the chatbot can be deployed with `serverless-deploy --aws-profile your-profile-name-here`

To allow for rendering of the plantuml, we are using plantuml's default PlantUML server system where images are generated on the fly by encoding graphs into the an image url.
Your own plantuml server can be built deployed onto aws lambda through the use of:
https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:293246570391:applications~plantuml-render

Once you have this setup, we should be able to set our environment variables. Copy `.env.example.yml` to `.env.yml` and change variables as necessary.

Running `serverless-deploy --aws-profile your-profile-name-here` will begin deploying (or redeploy) the code. 

The following endpoints will be created

```
https://twblu1e9n9.execute-api.us-east-1.amazonaws.com/dev
https://twblu1e9n9.execute-api.us-east-1.amazonaws.com/dev/list-asvs
https://twblu1e9n9.execute-api.us-east-1.amazonaws.com/dev/list-assets
```

**NOTE** To debug runtime errors in AWS Lambda functions with the serverless framework, it is useful to view the logs from AWS. Simply run the following:

```
time serverless --aws-profile serverless-demo logs -f listAssets
```

Where `listAssets` can be any of the lambda functions defined in [https://github.com/VCU-CS-Capstone/2017-2018-CS309-VPC-Mapping/blob/master/serverless.yml](serverless.yml).

## Slack Slash Commands

Once functions are hosted in AWS Lambda, it is possible to connect these newly created endpoints to a Slack Slash Command.

If not yet created, head to https://api.slack.com/apps to create your slack bot. Then select *Slash Commands* in the sidebar.

Create the following slash commands with the endoints deployed with the serverless framework.

```
Command: /zeebo
Request URL: https://twblu1e9n9.execute-api.us-east-1.amazonaws.com/dev
Short Description: Create server architecture diagrams
```

```
Command: /zeebo-list-asvs
Request URL: https://twblu1e9n9.execute-api.us-east-1.amazonaws.com/dev/list-asvs
Short Description: List assets for an ASV
```

```
Command: /zeebo-list-assets
Request URL: https://twblu1e9n9.execute-api.us-east-1.amazonaws.com/dev/list-assets
Short Description: List assets for a tag
```

Now slash commands can be run with your chatbot.

## Expanding the Diagram Builder

To expand upon the diagram builder, a new load class for the new server type must be created. Using the aws sdk load all of the data from the desired server. Once data is returned resolve the data array. Add the file to the src/diagrambuilder/index.js

`var loadRDS = require('./loadRDS');
` 

Finally in the src/diagramBuilder/index.js add the new file in the promise with the proper parameters.
