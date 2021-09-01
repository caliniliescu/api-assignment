import { initDb } from "../../utils/initDb";
import { callGraphql } from "../utils";

beforeAll(async () => {
  await initDb();
});

describe('Comments', () => {
  it('can save comment', async () => {
    const createCommentMutation = `
      mutation createCommentMutation($data: CreateCommentInput!){
        createComment(data: $data){
            message 
            author 
            id
        }
    }`;
    const comment = await callGraphql({
      source: createCommentMutation,
      variableValues: {
        data:{
          message: 'this is a comment for testing',
          author: 'anonymous'
        }
      }
    });
    expect(comment.data).toBeDefined();
    expect(comment.data.createComment).toBeDefined();
    expect(comment.data.createComment.author).toBe('anonymous');
  });
});