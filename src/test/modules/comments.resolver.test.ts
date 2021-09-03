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
        data: {
          message: 'this is a comment for testing',
          author: 'anonymous'
        }
      }
    });
    expect(comment.data).toBeDefined();
    expect(comment.data.createComment).toBeDefined();
    expect(comment.data.createComment.author).toBe('anonymous');
  });

  it('can retrieve comments', async () => {
    const getCommentsQuery = `query {getComments{message author id}}`;
    const comments = await callGraphql({
      source: getCommentsQuery
    });
    expect(comments.data).toBeDefined();
    expect(comments.data.getComments).toBeDefined();
    expect(comments.data.getComments[0].author).toBe('anonymous');
  });

  it('can retrieve a comment by id', async () => {
    const getCommentQuery = `query {getComment(id: 1){message author id}}`;
    const comment = await callGraphql({
      source: getCommentQuery
    });
    expect(comment.data).toBeDefined();
    expect(comment.data.getComment).toBeDefined();
    expect(comment.data.getComment.author).toBe('anonymous');
  });

  it('can update a comment', async () => {
    const updateCommentMutation = `
    mutation updateCommentMutation($data: UpdateCommentInput!){
      updateComment(data: $data){
          message 
          author 
          id
      }
    }`;
    const comment = await callGraphql({
      source: updateCommentMutation,
      variableValues: {
        data: {
          id: 1,
          message: 'updated message'
        }
      }
    });
    expect(comment.data).toBeDefined();
    expect(comment.data.updateComment).toBeDefined();
    expect(comment.data.updateComment.message).toBe('updated message');
  });

  it('can delete a comment', async () => {
    const deleteCommentMutation = `
    mutation deleteCommentMutation($data: DeleteCommentInput!){
      deleteComment(data: $data)
    }`;
    const comment = await callGraphql({
      source: deleteCommentMutation,
      variableValues: {
        data: {
          id: 1
        }
      }
    });
    expect(comment.data).toBeDefined();
    expect(comment.data.deleteComment).toBeDefined();
    expect(comment.data.deleteComment).toBe(true);
  });
});