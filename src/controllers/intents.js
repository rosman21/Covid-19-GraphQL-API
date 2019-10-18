import { IntentsClient } from 'dialogflow';

const projectId = 'newagent-a89e5';
const intentsClient = new IntentsClient();

const agentPath = intentsClient.projectAgentPath(projectId);

export const createIntent = async (
  displayName,
  trainingPhrasesParts,
  messageTexts
) => {
  const trainingPhrases = [];

  trainingPhrasesParts.forEach(trainingPhrasesPart => {
    const part = {
      text: trainingPhrasesPart
    };

    // Here we create a new training phrase for each provided part.
    const trainingPhrase = {
      type: 'EXAMPLE',
      parts: [part]
    };

    trainingPhrases.push(trainingPhrase);
  });

  const messageText = {
    text: messageTexts
  };

  const message = {
    text: messageText
  };

  const intent = {
    displayName: displayName,
    trainingPhrases: trainingPhrases,
    messages: [message]
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent
  };

  // Create the intent
  const responses = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${responses[0].name} created`);
  // [END dialogflow_create_intent]
};
export const listIntents = async () => {
  // Send the request for listing intents.
  const intents = [];
  const request = {
    parent: agentPath
  };
  const [response] = await intentsClient.listIntents(request);
  response.forEach(intent => {
    intents.push(intent);
  });
  return intents;
};
export const deleteIntent = async (projectId, intentId) => {
  const intentPath = intentsClient.intentPath(projectId, intentId);

  const request = { name: intentPath };

  // Send the request for deleting the intent.
  const result = await intentsClient.deleteIntent(request);
  console.log(`Intent ${intentPath} deleted`);
  return result;
};
