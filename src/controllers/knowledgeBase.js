import dialogflow from 'dialogflow';

const v2 = dialogflow.v2beta1;
const projectId = 'newagent-a89e5';
// Instantiate a DialogFlow KnowledgeBasesClient.
const client = new v2.KnowledgeBasesClient({
  projectPath: projectId
});

export const createKnowledgeBase = async (projectId, displayName) => {
  const formattedParent = client.projectPath(projectId);
  const knowledgeBase = {
    displayName: displayName
  };
  const request = {
    parent: formattedParent,
    knowledgeBase: knowledgeBase
  };
  const [result] = await client.createKnowledgeBase(request);
  console.log(`Name: ${result.name}`);
  console.log(`displayName: ${result.displayName}`);
  return result;
};
export const getKnowledgeBase = async (projectId, knowledgeBaseId) => {
  const formattedName = client.knowledgeBasePath(projectId, knowledgeBaseId);
  const [result] = await client.getKnowledgeBase({ name: formattedName });
  console.log(`displayName: ${result.displayName}`);
  console.log(`name: ${result.name}`);
  return result;
};
export const listKnowledgeBases = async () => {
  const array = [];
  const formattedParent = client.projectPath(projectId);
  const [resources] = await client.listKnowledgeBases({
    parent: formattedParent
  });
  resources.forEach(kBases => {
    const id = kBases.name.split('/');
    array.push({
      id: id[3],
      name: kBases.name,
      displayName: kBases.displayName
    });
  });
  return array;
  // [END dialogflow_list_knowledge_base]
};
export const deleteKnowledgeBase = async knowledgeBaseFullName => {
  const [result] = await client.deleteKnowledgeBase({
    name: knowledgeBaseFullName
  });

  if (result.name === 'undefined') console.log(`Knowledge Base deleted`);

  return result;
};
