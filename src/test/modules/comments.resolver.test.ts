import { sequelize } from "../../services/db.service"
import { callGraphql } from "../utils"

beforeAll(async () => {
  await sequelize.sync();
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
    console.log(comment);
    expect(comment.data).toBeDefined();
    expect(comment.data.author).toBe('anonymous');
  });
});