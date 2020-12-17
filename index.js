const core = require('@actions/core');

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const slack = require('slack-notify')(SLACK_WEBHOOK);

slack.onError = function (err) {
  core.error(`Error ${err}, action may still succeed though`);
};

// most @actions toolkit packages have async methods
async function run() {
  try {
    let attachment = {};
    attachment.fallback = core.getInput('fallback', {
      required: false
    });
    attachment.color = core.getInput('color', {
      required: false
    });
    attachment.pretext = core.getInput('pretext', {
      required: false
    });
    attachment.author_name = core.getInput('author_name', {
      required: false
    });
    attachment.author_link = core.getInput('author_link', {
      required: false
    });
    attachment.author_icon = core.getInput('author_icon', {
      required: false
    });
    attachment.title = core.getInput('title', {
      required: false
    });
    attachment.title_link = core.getInput('title_link', {
      required: false
    });
    attachment.text = core.getInput('text', {
      required: false
    });
    attachment.image_url = core.getInput('image_url', {
      required: false
    });
    attachment.thumb_url = core.getInput('thumb_url', {
      required: false
    });
    attachment.footer = core.getInput('footer', {
      required: false
    });
    attachment.footer_icon = core.getInput('footer_icon', {
      required: false
    });

    const channel = core.getInput('channel', {
      required: true
    });
    const icon_url = core.getInput('icon_url', {
      required: true
    });
    const username = core.getInput('username', {
      required: true
    });

    console.log("HERE");

    const testOutputObject = JSON.parse(attachment.text);

    slack.send({
      channel: channel,
      icon_url: icon_url,
      username: username,
      text: `GitHub action (${process.env.GITHUB_WORKFLOW}) triggered\n`,
      blocks: [
        {
          type: "text",
          text: {
            type: "mrkdwn",
            text: testOutputObject.text
          }
        }
      ]
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
